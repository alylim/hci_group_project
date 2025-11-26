import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

type DailySpinModalProps = {
  isOpen: boolean
  onClose: () => void
  onSpinComplete: (multiplier: number) => void
}

const rewards = [1.5, 2, 3, 1.2, 2.5, 1.8, 2.2, 1.5]

// Check if already spun this session
function hasSpunThisSession(): boolean {
  return sessionStorage.getItem('hasSpun') === 'true'
}

function getSessionReward(): number | null {
  const reward = sessionStorage.getItem('sessionReward')
  return reward ? parseFloat(reward) : null
}

function saveSpin(reward: number) {
  sessionStorage.setItem('hasSpun', 'true')
  sessionStorage.setItem('sessionReward', reward.toString())
}

export function DailySpinModal({
  isOpen,
  onClose,
  onSpinComplete,
}: DailySpinModalProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [showReward, setShowReward] = useState(false)
  const [selectedReward, setSelectedReward] = useState<number | null>(null)
  const [rotation, setRotation] = useState(0)

  // Initialize state based on whether already spun this session
  useEffect(() => {
    if (isOpen) {
      const alreadySpun = hasSpunThisSession()
      const sessionReward = getSessionReward()
      
      if (alreadySpun && sessionReward) {
        // Already spun - show reward screen
        setShowReward(true)
        setSelectedReward(sessionReward)
      } else {
        // Not spun yet - show wheel
        setShowReward(false)
        setSelectedReward(null)
        setRotation(0)
      }
    }
  }, [isOpen])

  const handleSpin = () => {
    // Prevent spinning if already spun this session
    if (hasSpunThisSession()) return

    setIsSpinning(true)
    setShowReward(false)

    // Randomly select a reward
    const rewardIndex = Math.floor(Math.random() * rewards.length)
    const reward = rewards[rewardIndex]

    // Calculate rotation to land on the selected reward
    const degreesPerSegment = 360 / rewards.length
    const baseRotation = 360 * 5 // Spin 5 full rotations
    const targetRotation = baseRotation + (rewardIndex * degreesPerSegment)

    setRotation(targetRotation)

    // Show reward after spin completes
    setTimeout(() => {
      setIsSpinning(false)
      setSelectedReward(reward)
      setShowReward(true)
      saveSpin(reward)
      onSpinComplete(reward)
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative z-10 w-full max-w-md mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-2xl font-bold text-center">Daily Spin</h2>

              {/* Spin Wheel */}
              {!showReward && (
                <div className="relative w-80 h-80 flex items-center justify-center">
                  {/* Pointer */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-red-500" />
                  </div>

                  {/* Wheel - No text, just colors */}
                  <motion.div
                    animate={{ rotate: rotation }}
                    transition={{
                      duration: 3,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                    className="relative w-72 h-72 rounded-full border-8 border-gray-200 shadow-xl overflow-hidden"
                  >
                    {rewards.map((reward, index) => {
                      const angle = (360 / rewards.length) * index
                      const isEven = index % 2 === 0
                      const segmentAngle = (360 / rewards.length) * (Math.PI / 180)

                      return (
                        <div
                          key={index}
                          className={`absolute inset-0 origin-center ${
                            isEven
                              ? 'bg-gradient-to-br from-cyan-400 to-blue-500'
                              : 'bg-gradient-to-br from-purple-400 to-pink-500'
                          }`}
                          style={{
                            transform: `rotate(${angle}deg)`,
                            clipPath: `polygon(50% 50%, 50% 0%, ${
                              50 + 50 * Math.sin(segmentAngle)
                            }% ${50 - 50 * Math.cos(segmentAngle)}%)`,
                          }}
                        />
                      )
                    })}

                    {/* Center Circle */}
                    <div className="absolute inset-0 m-auto w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <Sparkles className="text-yellow-500" size={36} />
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Reward Display */}
              {showReward && selectedReward && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', duration: 0.5 }}
                  className="flex flex-col items-center gap-4 w-full"
                >
                  <div className="text-center space-y-2">
                    <p className="text-lg text-gray-600">Congrats on your reward!</p>
                    <div className="flex items-center justify-center gap-2 text-4xl font-bold">
                      <Sparkles className="text-yellow-500" size={32} />
                      <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                        {selectedReward}x points
                      </span>
                      <Sparkles className="text-yellow-500" size={32} />
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg text-center w-full">
                    <p className="text-sm text-gray-600">
                      Your points earned today will be multiplied by {selectedReward}x!
                    </p>
                  </div>
                  
                  {/* Only show this message after spinning */}
                  <p className="text-xs text-gray-500 text-center">
                    Come back tomorrow for another spin!
                  </p>
                </motion.div>
              )}

              {/* Action Button */}
              {!showReward ? (
                <Button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {isSpinning ? 'Spinning...' : 'Spin Now'}
                </Button>
              ) : (
                <Button
                  onClick={onClose}
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all"
                >
                  Awesome!
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}