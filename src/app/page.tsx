import { ChatWindow } from "../components/chat/chat-window";
import { FileViewer } from "../components/file-viewer/file-viewer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 min-w-[360px]">
      <div className="mx-auto max-w-screen-2xl px-6 py-10">
        <div className="mb-6 space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900">
            DocuReview
          </h1>
          <p className="text-md text-zinc-600">
            Preview file contents and review the documents by chatting with your files.
          </p>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(420px,1fr)_minmax(540px,1.2fr)]">
          <ChatWindow />
          <FileViewer />
        </div>
      </div>
    </main>
  );
}
