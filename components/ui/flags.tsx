/**
 * Banderas como SVG inline (se ven igual en todos los sistemas, a diferencia de
 * los emoji de bandera que Windows no renderiza). Ratio 3:2 (viewBox 30x20).
 */

const STRIPE = 20 / 13

export function UsFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="Estados Unidos">
      <defs>
        <clipPath id="us-flag-clip">
          <rect width="30" height="20" rx="2.5" />
        </clipPath>
      </defs>
      <g clipPath="url(#us-flag-clip)">
        <rect width="30" height="20" fill="#fff" />
        {Array.from({ length: 7 }).map((_, k) => (
          <rect key={k} x="0" y={2 * k * STRIPE} width="30" height={STRIPE} fill="#B22234" />
        ))}
        <rect width="12" height={7 * STRIPE} fill="#3C3B6E" />
        <g fill="#fff">
          {[2.2, 5.4, 8.6].map((y) =>
            [2.4, 6, 9.6].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.7" />),
          )}
        </g>
      </g>
    </svg>
  )
}

export function SvFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="El Salvador">
      <defs>
        <clipPath id="sv-flag-clip">
          <rect width="30" height="20" rx="2.5" />
        </clipPath>
      </defs>
      <g clipPath="url(#sv-flag-clip)">
        <rect width="30" height="20" fill="#0047AB" />
        <rect y={20 / 3} width="30" height={20 / 3} fill="#fff" />
        <circle cx="15" cy="10" r="1.8" fill="none" stroke="#0047AB" strokeWidth="0.7" />
      </g>
    </svg>
  )
}
