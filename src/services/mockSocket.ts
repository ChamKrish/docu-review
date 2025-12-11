import { assistantContent, reasoningContent } from "../components/chat/mock-data";
import { IChatMessage, IChatMessageContent, ChatStatus } from "../components/chat/types";

type Listener = (msg: IChatMessage) => void;
type StatusListener = (status: ChatStatus) => void;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export class MockChatSocket {
  private listeners = new Set<Listener>();
  private statusListeners = new Set<StatusListener>();
  private tokenDelay = 60;

  connect(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  connectStatus(listener: StatusListener) {
    this.statusListeners.add(listener);
    return () => this.statusListeners.delete(listener);
  }

  private emit(msg: IChatMessage) {
    this.listeners.forEach((cb) => cb(msg));
  }

  private emitStatus(status: ChatStatus) {
    this.statusListeners.forEach((cb) => cb(status));
  }

  async send(userText: string) {
    this.emitStatus("loading");
    const userMessage: IChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: [{ label: "User", content: [userText] }],
    };
    this.emit(userMessage);

    await wait(1000);
    this.emitStatus("reasoning");
    await this.streamSections("reasoning", reasoningContent);
    await wait(500);
    this.emitStatus("answering");
    await this.streamSections("assistant", assistantContent);
    this.emitStatus("");
  }

  private async streamSections(
    role: "assistant" | "reasoning",
    sections: IChatMessageContent[]
  ) {
    const id = `${role}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    let current: IChatMessage = { id, role, content: [] };

    for (const section of sections) {
      current = {
        ...current,
        content: [...current.content, { label: section.label, content: [""] }],
      };
      this.emit(current);

      const text = section.content.join(" ");
      const tokens = text.split(" ").filter(Boolean);
      let partial = "";
      for (const token of tokens) {
        partial = `${partial} ${token}`.trim();
        const updated = {
          ...current,
          content: [
            ...current.content.slice(0, -1),
            { label: section.label, content: [partial] },
          ],
        };
        current = updated;
        this.emit(updated);
        await wait(this.tokenDelay);
      }
    }
  }
}

export const mockChatSocket = new MockChatSocket();

