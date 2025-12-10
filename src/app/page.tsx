import { ChatWindow } from "../components/chat/chat-window";
import { FileViewer } from "../components/file-viewer/file-viewer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-semibold text-zinc-900">DocuReview</h1>
          <p className="text-sm text-zinc-600">
            Preview file contents and review the documents by chatting with your files.
          </p>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(320px,1fr)_minmax(640px,1.5fr)]">
          <ChatWindow />
          <FileViewer />
        </div>
      </div>
    </main>
  );
}
