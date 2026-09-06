'use client'

interface CapsuleSVGProps {
  state?: 'empty' | 'received' | 'processing' | 'understood' | 'expiring' | 'deleted'
  className?: string
}

export function CapsuleSVG({ state = 'empty', className = '' }: CapsuleSVGProps) {
  const threadOpacity = state === 'deleted' ? 0 : state === 'expiring' ? 0.3 : state === 'empty' ? 0.5 : 0.8
  const glowOpacity = state === 'processing' ? 0.6 : state === 'received' ? 0.5 : state === 'understood' ? 0.4 : state === 'expiring' ? 0.2 : state === 'deleted' ? 0 : 0.3
  const shellFill = state === 'deleted' ? '#1E202400' : '#17181C'
  const threadColor = state === 'expiring' ? '#E0A63B' : '#6C87FF'

  return (
    <svg viewBox="0 0 200 280" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label={`Capsule status: ${state}`}>
      {/* Glow */}
      <defs>
        <radialGradient id={`glow-${state}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={threadColor} stopOpacity={glowOpacity} />
          <stop offset="100%" stopColor={threadColor} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`shell-${state}`} x1="50" y1="0" x2="150" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F4F4F3" stopOpacity="0.08" />
          <stop offset="50%" stopColor="#AEB0B4" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#F4F4F3" stopOpacity="0.06" />
        </linearGradient>
      </defs>

      {/* Ambient glow */}
      <ellipse cx="100" cy="140" rx="70" ry="120" fill={`url(#glow-${state})`} />

      {/* Contact shadow */}
      <ellipse cx="100" cy="260" rx="40" ry="6" fill="#000000" opacity="0.3" />

      {/* Capsule body */}
      <rect x="60" y="40" width="80" height="200" rx="40" fill={shellFill} stroke="#AEB0B4" strokeWidth="1" strokeOpacity="0.15" />
      <rect x="60" y="40" width="80" height="200" rx="40" fill={`url(#shell-${state})`} />

      {/* Top cap */}
      <ellipse cx="100" cy="40" rx="40" ry="8" fill="#1E2024" stroke="#AEB0B4" strokeWidth="1" strokeOpacity="0.12" />
      {/* Bottom cap */}
      <ellipse cx="100" cy="240" rx="40" ry="8" fill="#1E2024" stroke="#AEB0B4" strokeWidth="1" strokeOpacity="0.12" />

      {/* Signal thread */}
      <line x1="100" y1="50" x2="100" y2="230" stroke={threadColor} strokeWidth="2" strokeOpacity={threadOpacity} strokeLinecap="round" />

      {/* Processing particles */}
      {state === 'processing' && (
        <>
          <circle cx="85" cy="90" r="2" fill={threadColor} opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" from="0 100 140" to="360 100 140" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="115" cy="110" r="1.5" fill={threadColor} opacity="0.4">
            <animateTransform attributeName="transform" type="rotate" from="120 100 140" to="480 100 140" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle cx="90" cy="160" r="1.5" fill={threadColor} opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="240 100 140" to="600 100 140" dur="3.5s" repeatCount="indefinite" />
          </circle>
        </>
      )}

      {/* Received pulse ring */}
      {state === 'received' && (
        <ellipse cx="100" cy="140" rx="45" ry="45" fill="none" stroke={threadColor} strokeWidth="1" opacity="0.3">
          <animate attributeName="rx" from="40" to="70" dur="0.8s" fill="freeze" />
          <animate attributeName="ry" from="40" to="70" dur="0.8s" fill="freeze" />
          <animate attributeName="opacity" from="0.3" to="0" dur="0.8s" fill="freeze" />
        </ellipse>
      )}

      {/* Expiring ring */}
      {state === 'expiring' && (
        <circle cx="100" cy="140" r="50" fill="none" stroke="#E0A63B" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4">
          <animateTransform attributeName="transform" type="rotate" from="0 100 140" to="360 100 140" dur="8s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Deleted dissolution dots */}
      {state === 'deleted' && (
        <>
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              cx={80 + Math.cos(i * 0.785) * 20}
              cy={120 + Math.sin(i * 0.785) * 40}
              r="1.5"
              fill="#AEB0B4"
              opacity="0.3"
            >
              <animate attributeName="cy" from={String(120 + Math.sin(i * 0.785) * 40)} to={String(120 + Math.sin(i * 0.785) * 80)} dur="1s" fill="freeze" />
              <animate attributeName="opacity" from="0.3" to="0" dur="1s" fill="freeze" />
            </circle>
          ))}
        </>
      )}
    </svg>
  )
}
