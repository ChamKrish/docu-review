import React from 'react'

import { ChatRole, ChatStatus, IChatMessage } from './types';

interface IChatMessageProps {
  msg: IChatMessage;
  status: ChatStatus;
}

const roleStyles: Record<ChatRole, string> = {
  user: "bg-indigo-50 text-indigo-900 border border-indigo-100 ml-auto text-right",
  assistant: "bg-amber-50 text-amber-900 border border-amber-100",
  reasoning: "bg-zinc-100 text-zinc-900 border border-zinc-200",
};

const ChatMessage: React.FC<IChatMessageProps> = (props) => {
  return (
    <div
      key={props.msg.id}
      className={`w-fit max-w-full rounded-xl px-3 py-2 text-sm shadow-sm ${roleStyles[props.msg.role]}`}
    >
      <div className="mb-1 flex items-center gap-2 text-[11px] uppercase tracking-wide text-zinc-500">
        <span>{ props.msg.role === "user" ? "" : props.msg.role }</span>
        {props.msg.role === "assistant" && props.status === "answering" && (
          <span className="inline-flex h-1.5 w-1.5 items-center justify-center">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
          </span>
        )}
        {props.msg.role === "reasoning" && props.status === "reasoning" && (
          <span className="text-amber-500">●</span>
        )}
      </div>
      <div className="whitespace-pre-wrap break-words leading-6 space-y-2">
        {props.msg.content.map((section, idx) => (
          <div key={`${props.msg.id}-${idx}`} className="space-y-1">
            {props.msg.role !== "user" && (
              <div className="text-[11px] font-semibold uppercase text-zinc-600">
                {section.label}
              </div>
            )}
            <div>{section.content.join("\n")}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatMessage