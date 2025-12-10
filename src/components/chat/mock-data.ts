import { IChatMessage, IChatMessageContent } from "./types";

export const reasoningContent: IChatMessageContent[] = [
  {
    label: "Parsing overview.md",
    content: ["Fetching docs/overview.md now.","Reading overview.md: scanning for bullets, extracting key requirements."],
    duration: 1000,
  },
  {
    label: "Parsing api.md",
    content: ["Fetching docs/api.md now.","Reading api.md: extracting API endpoints."],
    duration: 1000,
  },
  {
    label: "Parsing Button.tsx",
    content: ["Fetching src/components/Button.tsx now.","Reading Button.tsx: extracting button component."],
    duration: 1000,
  },
  {
    label: "Parsing README.md",
    content: ["Fetching README.md now.","Reading README.md: understanding project overview."],
    duration: 1000,
  },
  {
    label: "Found 3 key files to summarize",
    content: ["docs/overview.md","docs/api.md","src/components/Button.tsx"],
    duration: 1000,
  },
  {
    label: "Gathering information",
    content: ["Gathering important information from the key project files to provide a comprehensive summary."],
    duration: 1000,
  },
];

export const assistantContent: IChatMessageContent[] = [
  {
    label: "Project files overview",
    content: [
      "docs/overview.md: The UI must (1) show a tree on the left, (2) open files on click on the right, and (3) stay simple/clean.",
      "docs/api.md: Lists REST endpoints for files and file retrieval with GET /api/files and GET /api/file?path=...",
      "src/components/Button.tsx: Exposes a simple Button component with bordered, rounded styling and hover/active states.",
      "README.md: Quick welcome and instruction to select a file to preview its contents."
    ],
  },
  {
    label: "Here's the summary of the project",
    content: [
      "Project recap: overview.md requires a left tree, right-side file preview, and simple UI; api.md documents GET /api/files and GET /api/file?path=...; Button.tsx defines a bordered, rounded button with hover/active states; README.md welcomes the user and explains selecting a file to preview."
    ],
  },
];

export const initialMessage: IChatMessage = {
  id: "assistant-welcome",
  role: "assistant",
  content: [
    {
      label: "",
      content: ["Welcome! Ask about a file or request a summary to get started."],
    },
  ],
};