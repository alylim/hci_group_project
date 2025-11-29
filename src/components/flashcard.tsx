import { easeInOut, motion } from 'framer-motion'
import { ParticleBurst } from './particle-burst-effect'
import type { TargetAndTransition } from 'framer-motion'

export type Rating = 'again' | 'hard' | 'good' | 'easy'

export type Flashcard = {
  id: string
  front: string
  back: string
}

const shuffleExit: TargetAndTransition = {
  transformOrigin: '100% 100%',
  x: [0, 20, 40, 60],
  y: [0, -20, -10, 80],
  rotate: [0, 12, 6, 0],
  scale: [1, 1.03, 1, 0.92],
  opacity: [1, 1, 1, 0],
  transition: {
    duration: 0.35,
    ease: easeInOut,
  },
}

const easyExit: TargetAndTransition = {
  scale: [1, 1.2, 0],
  rotate: [0, 8, 15],
  opacity: [1, 1, 0],
  transition: {
    duration: 0.5,
    times: [0, 0.4, 1],
    ease: easeInOut,
  },
}

const goodExit: TargetAndTransition = {
  scale: [1, 1.05, 0],
  opacity: [1, 1, 0],
  transition: {
    duration: 0.35,
    ease: easeInOut,
  },
}

type StaticCardProps = {
  card: Flashcard
  staticCard: true
}

type InteractiveCardProps = {
  card: Flashcard
  staticCard?: false
  flipped: boolean
  onFlip?: () => void
  onRated?: (rating: Rating) => void
  rating?: Rating | null
  progressBarElement?: HTMLElement | null
}

type CardProps = StaticCardProps | InteractiveCardProps

function Card(props: CardProps) {
  const { card } = props

  // Static (background) card
  if (props.staticCard) {
    return (
      <div className="w-full h-full bg-white rounded-2xl shadow-md border flex items-center justify-center text-xl font-medium px-4 text-center">
        {card.front}
      </div>
    )
  }

  const { flipped, rating, progressBarElement } = props

  // Determine exit animation based on rating
  let exitAnimation = shuffleExit
  if (rating === 'easy') {
    exitAnimation = easyExit
  } else if (rating === 'good') {
    exitAnimation = goodExit
  } else if (rating === 'again' || rating === 'hard') {
    exitAnimation = shuffleExit
  }

  return (
    <motion.div
      key={card.id}
      className="absolute inset-0"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={exitAnimation}
    >
      {/* Particle burst for Easy rating */}
      {rating === 'easy' && (
        <ParticleBurst trigger={true} targetElement={progressBarElement} />
      )}

      {/* Green glow effect for Good rating */}
      {rating === 'good' && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            boxShadow: [
              '0 0 0 0 rgba(34, 197, 94, 0)',
              '0 0 40px 10px rgba(34, 197, 94, 0.6)',
              '0 0 0 0 rgba(34, 197, 94, 0)',
            ],
          }}
          transition={{
            duration: 0.35,
            times: [0, 0.5, 1],
            ease: easeInOut,
          }}
        />
      )}

      {/* Red flash for Again rating */}
      {rating === 'again' && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            backgroundColor: [
              'rgba(239, 68, 68, 0)',
              'rgba(239, 68, 68, 0.2)',
              'rgba(239, 68, 68, 0)',
            ],
          }}
          transition={{
            duration: 0.35,
            times: [0, 0.5, 1],
            ease: easeInOut,
          }}
        />
      )}

      {/* Yellow flash for Hard rating */}
      {rating === 'hard' && (
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.3, 0],
            backgroundColor: [
              'rgba(234, 179, 8, 0)',
              'rgba(234, 179, 8, 0.2)',
              'rgba(234, 179, 8, 0)',
            ],
          }}
          transition={{
            duration: 0.35,
            times: [0, 0.5, 1],
            ease: easeInOut,
          }}
        />
      )}

      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="w-full h-full bg-white rounded-2xl shadow-xl border relative
                   flex items-center justify-center text-xl font-medium
                   border-gray-200"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center backface-hidden">
          <div className={flipped ? 'hidden' : ''}>{card.front}</div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center backface-hidden rotate-y-180">
          <div>{card.back}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export { Card }
