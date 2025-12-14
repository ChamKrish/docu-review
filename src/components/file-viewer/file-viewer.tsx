"use client";

import { useMemo, useState } from "react";

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
import { IoMdClose } from "react-icons/io";
import { IoReorderThreeSharp } from "react-icons/io5";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { LuListCollapse } from "react-icons/lu";

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
};

export const FileViewer = () => {
  const allFiles = useMemo(() => flattenFiles(sampleFiles), []);
  const [selectedFile, setSelectedFile] = useState<FileNode>(allFiles[0]);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [pinned, setPinned] = useState(true);

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
    <div className="flex h-[78vh] max-h-[78vh] min-h-[420px] flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <Card className="flex h-full relative border-none shadow-none flex-1 min-h-0 gap-3 overflow-hidden flex-col md:flex-row">
        {pinned && (
          <div className="absolute left-2 top-2 w-64 max-w-[90%] shrink-0 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg z-20 md:relative md:inset-auto md:w-52 md:shadow-none md:order-none">
            <CardHeader className="flex pb-3 px-1">
              <Button
                variant="text"
                size="sm"
                aria-label={"Hide tree"}
                className="!h-4 !p-1 mx-1"
                onClick={() => setPinned((p) => !p)}
              >
                <IoMdClose />
              </Button>
              <div className="space-y-1">
                <CardTitle className="text-lg font-semibold text-zinc-900">
                  Files 
                </CardTitle>
                <CardDescription>
                  Select a file to preview.
                </CardDescription>
              </div>
            </CardHeader>
            <Separator />
            <ScrollArea className="h-full p-3">
              <FileTree
                tree={sampleFiles}
                expanded={expanded}
                selectedPath={selectedFile?.path}
                onToggle={toggle}
                onSelect={setSelectedFile}
              />
            </ScrollArea>
          </div>
        )}
        <div className="flex flex-1 min-h-0 flex-col order-2">
          <CardHeader className="flex pb-3 px-1">
            {!pinned && (
              <Button
                variant="text"
                size="sm"
                aria-label={"Show tree"}
                className="!h-4 !p-1 mx-1"
                onClick={() => setPinned((p) => !p)}
              >
                <LuListCollapse />
              </Button>
            )}
            <div className="space-y-1">
              <CardTitle className="text-lg font-semibold text-zinc-900">
                {!pinned ? "Files · " : ""}{selectedFile?.name}
              </CardTitle>
              <CardDescription>
                {selectedFile?.path}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex h-full min-h-0 flex-col rounded-2xl border border-zinc-200 bg-slate-950 text-slate-100 overflow-hidden p-0">
            <div className="flex-1 min-h-0 px-5 py-4 overflow-auto">
              <pre className="h-full whitespace-pre-wrap break-words font-mono text-sm leading-6">
                <code>{selectedFile?.content ?? "No content available."}</code>
              </pre>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};
