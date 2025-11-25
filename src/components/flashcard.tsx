import { motion } from 'framer-motion'
import { useState } from 'react'

const shuffleExit = {
  transformOrigin: '100% 100%',
  x: [0, 20, 40, 60],
  y: [0, -20, -10, 80],
  rotate: [0, 12, 6, 0],
  scale: [1, 1.03, 1, 0.92],
  opacity: [1, 1, 1, 0],
  transition: {
    duration: 0.55,
    times: [0, 0.25, 0.55, 1],
    ease: 'easeInOut',
  },
}

export default function Card({ card, onRated, staticCard = false }) {
  const [flipped, setFlipped] = useState(false)

  if (staticCard) {
    return (
      <div className="w-full h-full bg-white rounded-2xl shadow-md border flex items-center justify-center text-xl font-medium">
        {card.front}
      </div>
    )
  }

  return (
    <motion.div
      key={card.id}
      className="absolute inset-0 cursor-pointer"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={shuffleExit}
      onClick={() => setFlipped((prev) => !prev)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.35 }}
        className="w-full h-full bg-white rounded-2xl shadow-xl border border-gray-200
                   flex items-center justify-center text-xl font-medium
                   [transform-style:preserve-3d]"
      >
        {/* FRONT */}
        <div className="absolute inset-0 flex items-center justify-center backface-hidden">
          {card.front}
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 flex items-center justify-center backface-hidden"
          style={{ transform: 'rotateY(180deg)' }}
          onClick={(e) => {
            // Prevent flipping back when rating
            e.stopPropagation()
          }}
        >
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => onRated('good')}
          >
            Continue
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
