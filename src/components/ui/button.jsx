import * as React from "react"
import PropTypes from "prop-types"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50",
        {
          "bg-black text-white hover:bg-black/90": variant === "default",
          "border border-black bg-transparent hover:bg-black hover:text-white": variant === "outline",
          "hover:bg-black/5": variant === "ghost",
        },
        {
          "h-9 px-4 py-2": size === "default",
          "h-8 px-3 text-xs": size === "sm",
          "h-10 px-8": size === "lg",
          "h-9 w-9 p-0": size === "icon",
        },
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"
Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "outline", "ghost"]),
  size: PropTypes.oneOf(["default", "sm", "lg", "icon"]),
}

export { Button }
