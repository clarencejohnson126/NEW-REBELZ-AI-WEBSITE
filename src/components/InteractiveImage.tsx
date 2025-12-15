import { useState } from 'react'

interface InteractiveImageProps {
  src?: string
  alt?: string
  className?: string
  placeholder?: string
  aspectRatio?: string
  grayscaleOnIdle?: boolean
}

export default function InteractiveImage({
  src,
  alt = 'Image',
  className = '',
  placeholder = 'Image',
  aspectRatio = 'aspect-video',
  grayscaleOnIdle = false,
}: InteractiveImageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20
    setMousePosition({ x, y })
  }

  return (
    <div
      className={`relative overflow-hidden rounded-md cursor-pointer group ${aspectRatio} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
          : 'perspective(1000px) rotateX(0) rotateY(0)',
        transition: isHovered ? 'none' : 'transform 0.5s ease-out',
      }}
    >
      {/* Background with gradient animation */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out ${
          isHovered
            ? 'bg-gradient-to-br from-surface-hover via-surface to-border'
            : 'bg-surface'
        }`}
      />

      {/* Animated grain/noise overlay */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${50 + mousePosition.x * 2}% ${50 + mousePosition.y * 2}%, rgba(255,255,255,0.1) 0%, transparent 50%)`
            : 'none',
        }}
      />

      {/* Border glow */}
      <div className="absolute inset-0 rounded-md border border-border group-hover:border-border-light transition-colors duration-500" />

      {/* Image or Placeholder */}
      {src ? (
        <img
          src={src}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
            grayscaleOnIdle ? 'grayscale group-hover:grayscale-0' : ''
          }`}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-small transition-all duration-500 ${
              isHovered ? 'text-foreground scale-110' : 'text-muted'
            }`}
          >
            {placeholder}
          </span>
        </div>
      )}

      {/* Corner accents that appear on hover */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-transparent group-hover:border-white/20 transition-colors duration-500 rounded-tl-md" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-transparent group-hover:border-white/20 transition-colors duration-500 rounded-tr-md" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-transparent group-hover:border-white/20 transition-colors duration-500 rounded-bl-md" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-transparent group-hover:border-white/20 transition-colors duration-500 rounded-br-md" />
    </div>
  )
}
