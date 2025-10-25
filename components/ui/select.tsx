import * as React from "react"
import { cn } from "@/lib/utils"

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border-2 border-vice-pink bg-vice-black px-3 py-2 text-sm text-white font-rajdhani font-semibold transition-all hover:shadow-[0_0_20px_rgba(255,0,110,0.5)] focus:shadow-[0_0_20px_rgba(255,0,110,0.5)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  )
})
Select.displayName = "Select"

export { Select }
