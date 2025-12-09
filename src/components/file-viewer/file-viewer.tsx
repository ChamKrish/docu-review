"use client";

import { useMemo, useState } from "react";

import { Badge } from "../ui/badge";
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
import { FileTree } from "./file-tree";
import { sampleFiles } from "./sample-data";
import { FileNode } from "./types";

const flattenFiles = (nodes: FileNode[]): FileNode[] => {
  const result: FileNode[] = [];
  nodes.forEach((node) => {
    if (node.type === "file") {
      result.push(node);
    }
    if (node.children) {
      result.push(...flattenFiles(node.children));
    }
  });
  return result;
}

export function FileViewer() {
  const allFiles = useMemo(() => flattenFiles(sampleFiles), []);
  const [selectedFile, setSelectedFile] = useState<FileNode>(allFiles[0]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (path: string) => {
    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const handleCopyPath = async () => {
    if (!selectedFile?.path) return;
    try {
      await navigator.clipboard?.writeText(selectedFile.path);
    } catch (err) {
      console.error("Failed to copy path", err);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <Card className="border-zinc-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-zinc-900">Files</CardTitle>
          <CardDescription>Select a file to preview its contents.</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <ScrollArea className="h-[520px]">
            <FileTree
              tree={sampleFiles}
              expanded={expanded}
              selectedPath={selectedFile?.path}
              onToggle={toggle}
              onSelect={setSelectedFile}
            />
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="border-zinc-200">
        <CardHeader className="flex items-start justify-between gap-4 pb-3">
          <div>
            <CardTitle className="text-lg font-semibold text-zinc-900">{selectedFile?.name}</CardTitle>
            <CardDescription className="text-xs text-zinc-500">
              {selectedFile?.path}
            </CardDescription>
          </div>
          <Badge variant="outline">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Read-only
          </Badge>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <ScrollArea className="h-[520px] rounded-b-xl border-t border-zinc-100 bg-slate-950 text-slate-100">
            <pre className="whitespace-pre-wrap break-words px-5 py-4 font-mono text-sm leading-6">
              <code>{selectedFile?.content ?? "No content available."}</code>
            </pre>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
