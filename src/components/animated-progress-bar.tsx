import { easeInOut, motion } from 'framer-motion'
import { forwardRef } from 'react'
import { Progress } from '@/components/ui/progress'

type GlowColor = 'green' | 'blue' | 'none'

const ReviewProgressBar = forwardRef<
  HTMLDivElement,
  {
    progress: number
    glowColor?: GlowColor
    glowTrigger?: number // Add trigger to force re-animation
  }
>(({ progress, glowColor = 'none', glowTrigger = 0 }, ref) => {
  const getGlowAnimation = (color: GlowColor) => {
    if (color === 'none') return {}

    const colorMap = {
      green: {
        rgb: '34, 197, 94',
        scale: [1, 1.08, 1],
        duration: 0.3,
      },
      blue: {
        rgb: '59, 130, 246',
        scale: [1, 1.1, 1.05, 1],
        duration: 0.3,
      },
    }

    const config = colorMap[color]

    return {
      scale: config.scale,
      boxShadow: [
        `0 0 0 0 rgba(${config.rgb}, 0)`,
        `0 0 30px 8px rgba(${config.rgb}, 0.6)`,
        `0 0 0 0 rgba(${config.rgb}, 0)`,
      ],
      transition: {
        duration: config.duration,
        ease: easeInOut,
      },
    }
  }

  return (
    <motion.div
      ref={ref}
      key={glowTrigger} // Force re-mount on trigger change
      animate={getGlowAnimation(glowColor)}
      className="w-full max-w-[340px] relative rounded-full"
    >
      <Progress value={progress * 100} className="h-3" />
    </motion.div>
  )
})

ReviewProgressBar.displayName = 'ReviewProgressBar'

export { ReviewProgressBar }
export type { GlowColor }
