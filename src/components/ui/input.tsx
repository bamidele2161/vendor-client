import * as React from "react";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(({
  className = "",
  type = "text",
  ...props
}, ref) => (
    <input
      ref={ref}
      type={type}
      className={`flex h-12 w-full rounded-xl border border-[#151A22]/10 bg-white px-4 py-2 text-sm text-[#151A22] shadow-sm shadow-[#151A22]/[0.02] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#6F8294] focus-visible:border-[#6F8294] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#6F8294]/10 disabled:cursor-not-allowed disabled:bg-[#EEF1F3] disabled:opacity-60 aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500/10 ${className}`}
      {...props}
    />
  ));
Input.displayName = "Input";
