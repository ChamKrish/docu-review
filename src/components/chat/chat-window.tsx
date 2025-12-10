"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { assistantContent, initialMessage, reasoningContent } from "./mock-data";
import { IChatMessage, ChatRole, IChatMessageContent } from "./types";
import ChatMessage from "./chat-message";

const TOKEN_DELAY = 60;

export type ChatMessageStatus = "loading" | "reasoning" | "answering" | "";

const ChatPlaceholder = new Map<ChatMessageStatus, string>([
  ["loading", "Thinking..."],
  ["reasoning", "Reasoning..."],
  ["answering", "Answering..."],
  ["", "Ask about a file or request a summary..."],
]);

export const ChatWindow = () => {
  const [messages, setMessages] = useState<IChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isSticky, setIsSticky] = useState(true);
  const [status, setStatus] = useState<ChatMessageStatus>("");
  const listRef = useRef<HTMLDivElement>(null);
  const streamTimer = useRef<NodeJS.Timeout | null>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const el = listRef.current;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
    });
  };

  const updateSticky = () => {
    const el = listRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setIsSticky(distanceFromBottom < 16);
  };

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const onScroll = () => updateSticky();
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isSticky) {
      scrollToBottom();
    }
  }, [messages, isSticky]);

  useEffect(() => {
    return () => {
      if (streamTimer.current) clearInterval(streamTimer.current);
    };
  }, []);

  const streamSection = (id: string, message: string | string[], sectionKey: string) =>
    new Promise<void>((resolve) => {
      const msg = Array.isArray(message) ? message.join("\n") : message;
      const tokens = msg.split(" ").filter((t) => t.length);

      if (!tokens.length) {
        resolve();
        return;
      }

      let idx = 0;
      const interval = setInterval(() => {
        idx += 1;
        setMessages((prev) =>
          prev.map((m) => {
            if (m.id !== id) return m;
            const updatedContent = m.content.map((c, contentIdx) => {
              if (contentIdx !== m.content.length - 1) return c;
              const text = tokens.slice(0, idx)?.join(" ") || "";
              return { ...c, [sectionKey]: Array.isArray(message) ? text.split("\n") : text };
            });
            return { ...m, content: updatedContent };
          })
        );
        if (idx >= tokens.length) {
          clearInterval(interval);
          resolve();
        }
      }, TOKEN_DELAY);
      streamTimer.current = interval;
    });

  const streamMessage = async (
    role: ChatRole,
    content: IChatMessageContent[]
  ) => {
    setStatus(role === "reasoning" ? "reasoning" : "answering");
    const id = `${Date.now()}-${role}`;

    setMessages((prev) => [
      ...prev,
      {
        id,
        role,
        content: [],
      },
    ]);

    for (const section of content) {
      setMessages((prev) =>
        prev.map((m) => {
          if (m.id !== id) return m;
          const nextContent = [...m.content, { label: "", content: [""] }];
          return { ...m, content: nextContent };
        })
      );
      await streamSection(id, section.label, 'label');
      await streamSection(id, section.content, 'content');
    }
    setStatus("");
  };
 
  const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    setIsSticky(true);
    const userMsg: IChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: [
        {
          label: "User",
          content: [text],
        },
      ],
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Stream reasoning first, then assistant answer sequentially.
    setStatus("loading");
    await wait(120);
    await streamMessage("reasoning", reasoningContent);
    setStatus("loading");
    await wait(400);
    await streamMessage("assistant", assistantContent);
  };

  return (
    <Card className="flex h-full min-h-[400px] max-h-[70vh] flex-col overflow-hidden border-zinc-200 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="flex items-center justify-between text-lg font-semibold text-zinc-900">
          Chat
        </CardTitle>
        <CardDescription>Review your documents by chatting with them...</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-1 min-h-0 flex-col gap-3 overflow-hidden p-0">
        <div className="relative flex-1 min-h-0">
          <ScrollArea ref={listRef} className="h-full min-h-0 px-4">
            <div className="space-y-3 py-4">
              {messages.map((msg) => (
                <ChatMessage msg={msg} status={status} />
              ))}
            </div>
          </ScrollArea>
          {!isSticky && (
            <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
              <Button
                type="button"
                variant="default"
                size="sm"
                aria-label="Scroll to bottom"
                className="pointer-events-auto bg-white text-sm text-zinc-500 hover:text-zinc-700 px-2 py-1 rounded-full shadow-lg"
                onClick={() => {
                  scrollToBottom();
                  setIsSticky(true);
                }}
              >
                Jump to latest
              </Button>
            </div>
          )}
        </div>
        <Separator />
        <form onSubmit={handleSend} className="space-y-2 px-4 pb-4 pt-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyPress}
            disabled={!!status}
            placeholder={ChatPlaceholder.get(status)}
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">
              Press Enter to send, Shift+Enter for newline
            </span>
            <Button type="submit" size="sm" variant="default" disabled={!!status || !input.trim()}>
              Send
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
