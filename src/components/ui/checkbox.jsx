import * as React from "react"
import PropTypes from "prop-types"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

const Checkbox = React.forwardRef(({ className, checked, ...props }, ref) => {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      className={cn(
        "peer h-5 w-5 shrink-0 rounded-md border-2 border-gray-300 shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:border-primary-400",
        checked && "bg-gradient-to-br from-primary-500 to-primary-600 text-white border-primary-500 shadow-md shadow-primary-500/30",
        className
      )}
      ref={ref}
      {...props}
    >
      {checked && <Check className="h-4 w-4 stroke-[3]" />}
    </button>
  )
})
Checkbox.displayName = "Checkbox"
Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
}

export { Checkbox }
