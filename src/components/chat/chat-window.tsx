"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

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
import ChatMessage from "./chat-message";
import { useGetMessagesQuery, useSendMessageMutation } from "../../services/chatApi";
import { RootState } from "../../store/store";
import { ChatStatus } from "./types";

const ChatPlaceholder = new Map<ChatStatus, string>([
  ["loading", "Thinking..."],
  ["reasoning", "Reasoning..."],
  ["answering", "Answering..."],
  ["", "Ask about a file or request a summary..."],
]);

export const ChatWindow = () => {
  const { data: messages = [] } = useGetMessagesQuery();
  const [sendMessage] = useSendMessageMutation();

  const status = useSelector<RootState, ChatStatus>(
    (state) => state.chatUi.status
  );

  const [input, setInput] = useState("");
  const [isSticky, setIsSticky] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

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

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    if (!text) return;
    setIsSticky(true);
    setInput("");
    try {
      await sendMessage(text).unwrap();
    } finally {
      console.log("Message sent");
    }
    try {
      await sendMessage(text).unwrap();
    } finally {
      console.log("Message sent");
    }
  };

  return (
    <Card className="flex h-[78vh] max-h-[78vh] min-h-[420px] flex-col overflow-hidden border-zinc-200 rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-zinc-900">
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
                <ChatMessage key={msg.id} msg={msg} status={status} />
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
                className="pointer-events-auto !bg-white text-sm text-zinc-500 hover:text-zinc-700 px-2 py-1 rounded-full shadow-lg"
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
