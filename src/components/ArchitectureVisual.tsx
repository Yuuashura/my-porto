import type { PortfolioContent } from '../content'

/** Booking Hotels has no screenshots yet, so its cover is this service-flow diagram. */
export function ArchitectureVisual({
  copy,
  className = '',
}: {
  copy: PortfolioContent['projectVisuals']
  className?: string
}) {
  return (
    <div
      className={`project-visual project-visual--architecture ${className}`}
      role="img"
      aria-label={copy.bookingIllustration}
    >
      <div className="architecture-title">
        <span>{copy.bookingFlow}</span>
        <span>{copy.microservices}</span>
      </div>
      <div className="service-flow">
        <div className="service-node service-node--primary">{copy.reactClient}</div>
        <span aria-hidden="true">→</span>
        <div className="service-node">{copy.apiGateway}</div>
        <span aria-hidden="true">→</span>
        <div className="service-stack">
          <span>{copy.auth}</span>
          <span>{copy.hotels}</span>
          <span>{copy.booking}</span>
        </div>
      </div>
      <div className="architecture-footer">
        <span>{copy.jwt}</span>
        <span>{copy.persistence}</span>
      </div>
    </div>
  )
}
