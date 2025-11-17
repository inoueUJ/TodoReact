import PropTypes from "prop-types"

const CircularProgress = ({
  percentage,
  size = 280,
  strokeWidth = 12,
  className = ""
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-linear drop-shadow-lg"
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
      </svg>

      {/* Glowing effect */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-30"
        style={{
          background: `conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)`,
          transform: `scale(${0.7 + (percentage / 100) * 0.3})`
        }}
      />
    </div>
  )
}

CircularProgress.propTypes = {
  percentage: PropTypes.number.isRequired,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  className: PropTypes.string,
}

export { CircularProgress }
