import { useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { GlowColor } from '@/components/animated-progress-bar'
import { Window } from '@/components/window'
import { FlashcardDeck } from '@/components/flashcard-deck'
import { Button } from '@/components/ui/button'
import { ReviewProgressBar } from '@/components/animated-progress-bar'
import { useSound } from '@/hooks/useSound'
import { useLeaderboardStore } from '@/stores/leaderboard-store'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const Route = createFileRoute('/review')({
  component: RouteComponent,
})

type Flashcard = {
  id: string
  front: string
  back: string
}

const cards: Array<Flashcard> = [
  {
    id: '1',
    front: 'Which year was the first iPhone released?',
    back: '2007',
  },
  {
    id: '2',
    front: 'Definition of "Gulf of execution"',
    back: 'distance it takes user to perform action in interface',
  },
  {
    id: '3',
    front: 'useState vs useEffect?',
    back: 'useEffect for handling side effects, useState for handling reactive state changes',
  },
  {
    id: '4',
    front:
      'What caused the 1325 conflict between the rival Italian city-states of Bologna and Modena?',
    back: 'A wooden bucket (Oaken bucket)',
  },
  { id: '5', front: 'What is the capital of Germany?', back: 'Berlin' },
  {
    id: '6',
    front: 'Definition of "Gulf of evaluation"',
    back: 'Amount of effort user must make to interpret the state of the system and determine if they have reached their goals',
  },
  {
    id: '7',
    front: 'Mitochondria',
    back: 'The powerhouse of the cell',
  },
  {
    id: '8',
    front: 'Which war in November 1932 did Australia participate in?',
    back: 'The great emu war',
  },
]

type Rating = 'again' | 'hard' | 'good' | 'easy'

function RouteComponent() {
  const [deck, setDeck] = useState<Array<Flashcard>>(cards)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [currentRating, setCurrentRating] = useState<Rating | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set())
  const [progressBarGlow, setProgressBarGlow] = useState<GlowColor>('none')
  const progressBarRef = useRef<HTMLDivElement>(null)

  const addPoints = useLeaderboardStore((state) => state.addPoints)

  const playEasySound = useSound('easy.mp3', 0.5)
  const playGoodSound = useSound('good.mp3', 0.5)
  const playHardSound = useSound('hard.mp3', 0.5)
  const playAgainSound = useSound('again.mp3', 0.1)

  const currentCard = deck[currentIndex]

  const buttonState: 'show' | 'rate' = isFlipped ? 'rate' : 'show'

  const handleShowAnswer = () => {
    setIsFlipped(true)
  }

  const handleRate = (rating: Rating) => {
    // Calculate new deck state BEFORE setting rating
    const newDeck = [...deck]
    const currentCardData = newDeck[currentIndex]
    let shouldAdvance = false

    switch (rating) {
      case 'again': {
        playAgainSound(400)
        newDeck.splice(currentIndex, 1)
        const insertPosAgain = Math.min(currentIndex + 2, newDeck.length)
        newDeck.splice(insertPosAgain, 0, currentCardData)
        shouldAdvance = true
        break
      }

      case 'hard': {
        playHardSound(500)
        newDeck.splice(currentIndex, 1)
        const insertPosHard = Math.min(currentIndex + 4, newDeck.length)
        newDeck.splice(insertPosHard, 0, currentCardData)
        shouldAdvance = true
        break
      }

      case 'good':
        playGoodSound(500)
        newDeck.splice(currentIndex, 1)
        setMasteredCards((prev) => new Set(prev).add(currentCardData.id))
        shouldAdvance = true
        setProgressBarGlow('green')
        break
      case 'easy':
        playEasySound(400)
        newDeck.splice(currentIndex, 1)
        setMasteredCards((prev) => new Set(prev).add(currentCardData.id))
        shouldAdvance = true
        setProgressBarGlow('blue')
        break

      default:
        throw new Error(`Invalid rating: ${rating}`)
    }

    // Set rating to trigger card animation immediately
    setCurrentRating(rating)

    // Update UI state after animation completes
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (shouldAdvance) {
        setDeck(newDeck)
        setIsFlipped(false)

        // Check if complete
        if (newDeck.length === 0) {
          setIsComplete(true)
          addPoints(80) // Example: 10 points per mastered card
        } else if (currentIndex >= newDeck.length) {
          setCurrentIndex(0)
        }
      }

      setCurrentRating(null)
      setProgressBarGlow('none')
    }, 350)
  }

  const progress = masteredCards.size / cards.length

  return (
    <div className="w-screen">
      <div className="py-20 px-40">
        <Window>
          <div className="py-40 bg-gray-100 flex flex-col items-center space-y-8">
            {!isComplete && deck.length > 0 && (
              <FlashcardDeck
                currentCard={currentCard}
                nextCard={deck[currentIndex + 1]}
                hasNextCard={currentIndex < deck.length - 1}
                isFlipped={isFlipped}
                rating={currentRating}
                progressBarRef={progressBarRef}
              />
            )}

            {isComplete && (
              <div className="flex flex-col items-center space-y-4">
                <div className="text-2xl font-semibold">All done 🎉</div>
                <div className="text-sm text-gray-500">
                  You've mastered all {cards.length} cards!
                </div>
                <Button
                  onClick={() => {
                    setDeck(cards)
                    setCurrentIndex(0)
                    setIsFlipped(false)
                    setIsComplete(false)
                    setMasteredCards(new Set())
                    setProgressBarGlow('none')
                  }}
                >
                  Restart deck
                </Button>
              </div>
            )}

            <ReviewProgressBar
              ref={progressBarRef}
              progress={progress}
              glowColor={progressBarGlow}
            />

            {!isComplete && deck.length > 0 && (
              <ReviewButtonRender
                status={buttonState}
                handleShowAnswer={handleShowAnswer}
                onRate={handleRate}
              />
            )}
          </div>
        </Window>
      </div>
    </div>
  )
}

type ReviewButtonRenderProps = {
  status: 'show' | 'rate'
  handleShowAnswer: () => void
  onRate: (rating: Rating) => void
}

function ReviewButtonRender({
  status,
  handleShowAnswer,
  onRate,
}: ReviewButtonRenderProps) {
  return (
    <div className="flex space-x-4">
      {status === 'rate' && (
        <>
          <SRSTooltip text="Review again in less than 1 minute">
            <Button
              onClick={() => onRate('again')}
              className="px-4 py-2 bg-red-200 shadow hover:bg-red-400 border-red-600 text-red-800 w-[100px]"
              variant="outline"
            >
              Try Again
            </Button>
          </SRSTooltip>
          <SRSTooltip text="Review again in less than 3 minutes">
            <Button
              onClick={() => onRate('hard')}
              className="px-4 py-2 bg-yellow-100 shadow hover:bg-yellow-400 border border-yellow-600 text-yellow-800 w-[100px]"
              variant="outline"
            >
              Hard
            </Button>
          </SRSTooltip>
          <SRSTooltip text="Review in 1 day">
            <Button
              onClick={() => onRate('good')}
              className="px-4 py-2 bg-green-200 shadow hover:bg-green-400 border border-green-600 text-green-800 w-[100px]"
              variant="outline"
            >
              Good
            </Button>
          </SRSTooltip>
          <SRSTooltip text="Review again in 4 days">
            <Button
              onClick={() => onRate('easy')}
              className="px-4 py-2 bg-blue-200 shadow hover:bg-blue-400 border border-blue-600 text-blue-800 w-[100px]"
              variant="outline"
            >
              Easy
            </Button>
          </SRSTooltip>
        </>
      )}
      {status === 'show' && (
        <Button onClick={handleShowAnswer}>Show Answer</Button>
      )}
    </div>
  )
}

function SRSTooltip({
  text,
  children,
}: {
  text: string
  children: React.ReactNode
}) {
  return (
    <Tooltip delayDuration={1000}>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent className="max-w-xs">
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  )
}
