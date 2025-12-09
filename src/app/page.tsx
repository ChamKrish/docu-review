import { FileViewer } from "../components/file-viewer/file-viewer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-6 space-y-2">
          <h1 className="text-2xl font-semibold text-zinc-900">DocuReview</h1>
          <p className="text-sm text-zinc-600">
            Preview file contents and review the documents by chatting with your files.
          </p>
        </div>
        <FileViewer />
      </div>
    </main>
  );
}
