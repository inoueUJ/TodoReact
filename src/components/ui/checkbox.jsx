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
        "peer h-4 w-4 shrink-0 rounded-sm border border-black shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black disabled:cursor-not-allowed disabled:opacity-50",
        checked && "bg-black text-white",
        className
      )}
      ref={ref}
      {...props}
    >
      {checked && <Check className="h-4 w-4" />}
    </button>
  )
})
Checkbox.displayName = "Checkbox"
Checkbox.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool,
}

export { Checkbox }
