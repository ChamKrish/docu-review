import { Button } from "../ui/button";
import { cn } from "../../lib/utils";
import { FileNode } from "./types";
import { FileTreeItem } from "./file-tree-item";

type FileTreeProps = {
  tree: FileNode[];
  expanded: Record<string, boolean>;
  selectedPath: string;
  onToggle: (path: string) => void;
  onSelect: (node: FileNode) => void;
};

export const FileTree: React.FC<FileTreeProps> = (props) => {
  return (
    <div className="space-y-0.5">
      {props.tree.map((node) => (
        <FileTreeItem
          key={node.path}
          node={node}
          depth={0}
          expanded={props.expanded}
          selectedPath={props.selectedPath}
          onToggle={props.onToggle}
          onSelect={props.onSelect}
        />
      ))}
    </div>
  );
}
