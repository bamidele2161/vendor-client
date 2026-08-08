import * as React from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={`flex min-h-[104px] w-full resize-y rounded-xl border border-[#151A22]/10 bg-white px-4 py-3 text-sm text-[#151A22] shadow-sm shadow-[#151A22]/[0.02] transition-colors placeholder:text-[#6F8294] focus-visible:border-[#6F8294] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6F8294]/10 disabled:cursor-not-allowed disabled:bg-[#EEF1F3] disabled:opacity-60 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500/10 ${className}`}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
