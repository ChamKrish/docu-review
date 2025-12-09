import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { FileNode } from "./types";

interface FileTreeItemProps {
  node: FileNode;
  depth: number;
  expanded: Record<string, boolean>;
  selectedPath: string;
  onToggle: (path: string) => void;
  onSelect: (node: FileNode) => void;
}

export const FileTreeItem: React.FC<FileTreeItemProps> = (props) => {
  const isExpanded = props.expanded[props.node.path] ?? true;
  const isSelected = props.selectedPath === props.node.path;
  const paddingLeft = props.depth * 14 + 12;

  if (props.node.type === "file") {
    return (
      <Button
        variant="text"
        size="sm"
        onClick={() => props.onSelect(props.node)}
        className={cn(
          "flex w-full items-center justify-start gap-2 px-3 font-normal text-zinc-800 hover:text-zinc-900",
          isSelected && "bg-indigo-50 text-indigo-700"
        )}
        style={{ paddingLeft }}
      >
        <span className="text-xs text-zinc-500">📄</span>
        <span className="truncate">{props.node.name}</span>
      </Button>
    );
  }

  return (
    <div>
      <Button
        variant="text"
        size="sm"
        onClick={() => props.onToggle(props.node.path)}
        className="flex w-full items-center justify-start gap-2 px-3 font-semibold text-zinc-800 hover:text-zinc-900"
        style={{ paddingLeft }}
      >
        <span className="text-xs text-zinc-500">
          {isExpanded ? "📂" : "📁"}
        </span>
        <span className="truncate">{props.node.name}</span>
      </Button>
      {isExpanded && props.node.children && (
        <div className="space-y-0.5">
          {props.node.children.map((child) => (
            <FileTreeItem
              key={child.path}
              node={child}
              depth={props.depth + 1}
              expanded={props.expanded}
              selectedPath={props.selectedPath}
              onToggle={props.onToggle}
              onSelect={props.onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}