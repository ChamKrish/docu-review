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
        content: `export function hello(name: string) {
  return \`Hello, \${name}\`;
}

console.log(hello("World"));`,
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

