import { FileNode } from "./types";

export const sampleFiles: FileNode[] = [
  {
    name: "docs",
    path: "docs",
    type: "folder",
    children: [
      {
        name: "overview.md",
        path: "docs/overview.md",
        type: "file",
        content: `# Project Overview

This doc explains the requirements for the file viewer:
- Show a tree on the left
- Open files on the right
- Keep the UI simple`,
      },
      {
        name: "api.md",
        path: "docs/api.md",
        type: "file",
        content: `# API Notes 

GET /api/files
GET /api/file?path=path/to/file`,
      },
    ],
  },
  {
    name: "src",
    path: "src",
    type: "folder",
    children: [
      {
        name: "index.ts",
        path: "src/index.ts",
        type: "file",
        content: `const buttonClasses =
  "rounded-md border border-zinc-300 px-3 py-1 text-sm font-medium shadow-sm hover:bg-zinc-50 active:translate-y-px transition";

export function bootstrap(containerId: string) {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = "<h1>DocuReview Demo</h1><p>Click to simulate loading files.</p>";

  const btn = document.createElement("button");
  btn.textContent = "Load files";
  btn.className = buttonClasses;

  const log = document.createElement("pre");
  log.className =
    "mt-3 max-h-48 overflow-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-100";
  log.textContent = "logs will appear here...";

  btn.onclick = () => {
    btn.disabled = true;
    log.textContent += "\\n> fetching files...";
    btn.textContent = "Loading...";
    setTimeout(() => {
      btn.textContent = "Files loaded";
      log.textContent += "\\n✓ 8 files loaded from cache";
      btn.disabled = false;
    }, 1200);
  };

  const list = document.createElement("ul");
  list.className = "mt-4 space-y-1 text-sm text-slate-700";

  const items = [
    "docs/overview.md",
    "docs/api.md",
    "src/index.ts",
    "src/components/Button.tsx",
    "public/favicon.ico",
    "next.config.js",
    "package.json",
    "README.md",
    "app/page.tsx",
    "src/components/chat/chat-window.tsx",
    "src/components/file-viewer/file-viewer.tsx",
  ];

  for (const path of items) {
    const li = document.createElement("li");
    li.textContent = "• " + path;
    list.appendChild(li);
  }

  const note = document.createElement("p");
  note.className = "mt-3 text-xs text-slate-500";
  note.textContent = "Tip: open a file from the tree to see its contents.";

  el.append(btn, list, log, note);
}
`,
      },
      {
        name: "components",
        path: "src/components",
        type: "folder",
        children: [
          {
            name: "Button.tsx",
            path: "src/components/Button.tsx",
            type: "file",
            content: `import type { ComponentPropsWithoutRef } from "react";

export function Button(props: ComponentPropsWithoutRef<"button">) {
  return (
    <button
      {...props}
      className={
        "rounded-md border border-zinc-300 px-3 py-1 text-sm font-medium shadow-sm " +
        "hover:bg-zinc-50 active:translate-y-px transition"
      }
    />
  );
}`,
          },
        ],
      },
    ],
  },
  {
    name: "README.md",
    path: "README.md",
    type: "file",
    content: `# Welcome

Select a file from the tree to preview its contents.`,
  },
];

