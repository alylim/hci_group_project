import { useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import type { GlowColor } from '@/components/animated-progress-bar'
import { Window } from '@/components/window'
import { FlashcardDeck } from '@/components/flashcard-deck'
import { Button } from '@/components/ui/button'
import { ReviewProgressBar } from '@/components/animated-progress-bar'

export const Route = createFileRoute('/review')({
  component: RouteComponent,
})

type Flashcard = {
  id: string
  front: string
  back: string
}

const cards: Array<Flashcard> = [
  { id: '1', front: 'What is the capital of france?', back: 'paris' },
  {
    id: '2',
    front: 'Gulf of execution',
    back: 'distance it takes user to perform action in interface',
  },
  {
    id: '3',
    front: 'useState vs useEffect',
    back: 'useEffect for handling side effects, useState for handling reactive state changes',
  },
  { id: '4', front: '3+2?', back: '5' },
  { id: '5', front: 'What is the capital of germany?', back: 'berlin' },
  {
    id: '6',
    front: 'Gulf of evaluation',
    back: 'Amount of effort user must make to interpret the state of the system and determine if they have reached their goals',
  },
  {
    id: '7',
    front: 'useSyncExternalStore vs useEffect',
    back: 'useSyncExternalStore for subscribing to external stores, useEffect for handling side effects',
  },
  { id: '8', front: '2+2?', back: '4' },
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
        newDeck.splice(currentIndex, 1)
        const insertPosAgain = Math.min(currentIndex + 2, newDeck.length)
        newDeck.splice(insertPosAgain, 0, currentCardData)
        shouldAdvance = true
        break
      }

      case 'hard': {
        newDeck.splice(currentIndex, 1)
        const insertPosHard = Math.min(currentIndex + 4, newDeck.length)
        newDeck.splice(insertPosHard, 0, currentCardData)
        shouldAdvance = true
        break
      }

      case 'good':
      case 'easy':
        newDeck.splice(currentIndex, 1)
        setMasteredCards((prev) => new Set(prev).add(currentCardData.id))
        shouldAdvance = true

        // Trigger progress bar glow immediately with card
        setProgressBarGlow(rating === 'easy' ? 'blue' : 'green')
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
          <Button
            onClick={() => onRate('again')}
            className="px-4 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600"
          >
            Again
          </Button>
          <Button
            onClick={() => onRate('hard')}
            className="px-4 py-2 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600"
          >
            Hard
          </Button>
          <Button
            onClick={() => onRate('good')}
            className="px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600"
          >
            Good
          </Button>
          <Button
            onClick={() => onRate('easy')}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600"
          >
            Easy
          </Button>
        </>
      )}
      {status === 'show' && (
        <Button onClick={handleShowAnswer}>Show Answer</Button>
      )}
    </div>
  )
}
