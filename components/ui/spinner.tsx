"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  fullScreen?: boolean;
  className?: string;
}

export function Spinner({ fullScreen = false, className }: SpinnerProps) {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Loader2 className={cn("h-5 w-5 animate-spin text-primary", className)} />
  );
}

