import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Window } from '@/components/window'
import { FlashcardDeck } from '@/components/flashcard-deck'
import { Button } from '@/components/ui/button'

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
  { id: '4', front: '2+2?', back: '4' },
]

type Rating = 'again' | 'hard' | 'good' | 'easy'

function RouteComponent() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  const isDone = currentIndex >= cards.length

  const currentCard = !isDone ? cards[currentIndex] : undefined
  const nextCard =
    !isDone && currentIndex + 1 < cards.length
      ? cards[currentIndex + 1]
      : undefined

  const buttonState: 'show' | 'rate' = isFlipped ? 'rate' : 'show'

  const handleShowAnswer = () => {
    if (!currentCard) return
    setIsFlipped(true)
  }

  const handleRate = (_rating: Rating) => {
    setIsFlipped(false)
    setCurrentIndex((prev) => prev + 1)
  }

  return (
    <div className="w-screen">
      <div className="py-20 px-40">
        <Window>
          <div>hello review</div>

          <div className="py-40 bg-gray-100 flex flex-col items-center space-y-8">
            {!isDone && (
              <>
                <FlashcardDeck
                  currentCard={currentCard}
                  nextCard={nextCard}
                  isFlipped={isFlipped}
                />

                <ReviewButtonRender
                  status={buttonState}
                  handleShowAnswer={handleShowAnswer}
                  onRate={handleRate}
                />
              </>
            )}

            {isDone && (
              <div className="flex flex-col items-center space-y-4">
                <div className="text-2xl font-semibold">All done 🎉</div>
                <div className="text-sm text-gray-500">
                  You’ve finished this deck.
                </div>
                <Button
                  onClick={() => {
                    setCurrentIndex(0)
                    setIsFlipped(false)
                  }}
                >
                  Restart deck
                </Button>
              </div>
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
        <div>
          <Button
            onClick={() => onRate('again')}
            className="px-4 py-2 bg-red-500 text-white rounded-xl shadow"
          >
            Again
          </Button>
          <Button
            onClick={() => onRate('hard')}
            className="px-4 py-2 bg-yellow-500 text-white rounded-xl shadow"
          >
            Hard
          </Button>
          <Button
            onClick={() => onRate('good')}
            className="px-4 py-2 bg-green-500 text-white rounded-xl shadow"
          >
            Good
          </Button>
          <Button
            onClick={() => onRate('easy')}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl shadow"
          >
            Easy
          </Button>
        </div>
      )}
      {status === 'show' && (
        <div>
          <Button onClick={handleShowAnswer}>Show Answer</Button>
        </div>
      )}
    </div>
  )
}
