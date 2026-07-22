"use client";

import type { ReactNode } from "react";

/**
 * Fixed comic page canvas (1600:1994). All spreads share this stage size
 * so cover / bridges / comics / conclusion feel like the same physical page.
 */
export function PageStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`page-stage ${className}`.trim()}>
      <div className="page-stage-inner">{children}</div>
    </div>
  );
}
