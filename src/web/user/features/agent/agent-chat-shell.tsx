import type { ComponentPropsWithRef, ReactNode } from "react";

type AgentChatShellProps = ComponentPropsWithRef<"div"> & {
  /** Fills the content area. */
  children: ReactNode;
  /** Pinned to the bottom, above the disclaimer. */
  input: ReactNode;
};

export function AgentChatShell({ children, input, className, ...rest }: AgentChatShellProps) {
  return (
    <div
      className={`flex h-full min-h-0 flex-col items-stretch bg-transparent px-3 pb-16 text-foreground sm:px-4 md:pb-0 ${className ?? ""}`}
      {...rest}
    >
      <div className="relative flex min-h-0 grow flex-col">{children}</div>
      <div className="mx-auto flex w-full max-w-3xl shrink-0 flex-col gap-2 pb-2 pt-3">
        {input}
        <p className="text-center text-xs text-[#5d5d5d]">
          AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
}
