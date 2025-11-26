import { easeInOut, motion } from 'framer-motion'
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
    times: [0, 0.25, 0.55, 1],
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

  const { flipped } = props

  return (
    <motion.div
      key={card.id}
      className="absolute inset-0"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={shuffleExit}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="w-full h-full bg-white rounded-2xl shadow-xl border border-gray-200
                   flex items-center justify-center text-xl font-medium relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* <div className={flipped ? 'rotate-y-180' : ''}>
          {flipped ? card.back : card.front}
        </div> */}
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
