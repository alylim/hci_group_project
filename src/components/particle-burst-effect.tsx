import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

type Particle = {
  id: number
  x: number
  y: number
  targetX: number
  targetY: number
  rotation: number
  scale: number
  color: string
  delay: number
}

type ParticleBurstProps = {
  trigger: boolean
  onComplete?: () => void
  targetElement?: HTMLElement | null
}

export function ParticleBurst({
  trigger,
  onComplete,
  targetElement,
}: ParticleBurstProps) {
  const [particles, setParticles] = useState<Array<Particle>>([])

  useEffect(() => {
    if (!trigger) return

    let targetX = 0
    let targetY = 0

    // Calculate target position (right edge of progress bar relative to card)
    if (targetElement) {
      const targetRect = targetElement.getBoundingClientRect()
      const cardElement = document.querySelector(
        '.absolute.inset-0[style*="perspective"]',
      )
      if (cardElement) {
        const cardRect = cardElement.getBoundingClientRect()
        // Target the right edge of the progress bar
        targetX = targetRect.right - (cardRect.left + cardRect.width / 2)
        targetY =
          targetRect.top +
          targetRect.height / 2 -
          (cardRect.top + cardRect.height / 2)
      }
    }

    // Generate 24 particles with random spread
    const newParticles: Array<Particle> = Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2 + (Math.random() - 0.5) * 0.3
      const burstDistance = 70 + Math.random() * 30
      const x = Math.cos(angle) * burstDistance
      const y = Math.sin(angle) * burstDistance

      return {
        id: i,
        x,
        y,
        targetX, // All converge to right edge of progress bar
        targetY,
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.6,
        color: ['#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe', '#2563eb'][
          Math.floor(Math.random() * 5)
        ],
        delay: Math.random() * 0.05,
      }
    })

    setParticles(newParticles)

    // Clean up after animation
    const timer = setTimeout(() => {
      setParticles([])
      onComplete?.()
    }, 350)

    return () => clearTimeout(timer)
  }, [trigger, onComplete, targetElement])

  if (particles.length === 0) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full shadow-lg"
          style={{
            backgroundColor: particle.color,
          }}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            opacity: 0,
            rotate: 0,
          }}
          animate={{
            x: [0, particle.x, particle.targetX],
            y: [0, particle.y, particle.targetY],
            scale: [0, particle.scale * 1.4, 0.3, 0],
            opacity: [0, 1, 1, 0.8, 0],
            rotate: [0, particle.rotation * 0.5, particle.rotation],
          }}
          transition={{
            duration: 0.55,
            delay: particle.delay,
            times: [0, 0.2, 0.7, 0.9, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  )
}
