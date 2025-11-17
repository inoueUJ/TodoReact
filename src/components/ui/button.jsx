import * as React from "react"
import PropTypes from "prop-types"
import { cn } from "../../lib/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
        {
          "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40": variant === "default",
          "border-2 border-primary-500 bg-transparent text-primary-600 hover:bg-primary-50 shadow-sm hover:shadow-md": variant === "outline",
          "hover:bg-gray-100 text-gray-700 hover:text-gray-900": variant === "ghost",
          "bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40": variant === "accent",
        },
        {
          "h-10 px-5 py-2": size === "default",
          "h-8 px-3 text-xs": size === "sm",
          "h-12 px-8 text-base": size === "lg",
          "h-10 w-10 p-0": size === "icon",
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
  variant: PropTypes.oneOf(["default", "outline", "ghost", "accent"]),
  size: PropTypes.oneOf(["default", "sm", "lg", "icon"]),
}

export { Button }
