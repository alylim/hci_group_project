import { useState } from 'react'
import Card from './flashcard'
import RatingButtons from './rating-buttons'

type FlashcardDeckProps = {
  data: { front: string; back: string }[]
}

function FlashcardDeck({ data }: FlashcardDeckProps) {
  const [cards, setCards] = useState(data)

  const nextCard = cards[1]

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center space-y-6 bg-gray-100">
      <div className="relative w-[340px] h-[220px]">
        {/* Next card (stacked, lower opacity) */}
        {nextCard && (
          <div className="absolute inset-0 scale-[0.96] translate-y-2 opacity-70">
            <Card card={nextCard} staticCard />
          </div>
        )}

        {/* Current card */}
        {currentCard && (
          <Card key={currentCard.id} card={currentCard} onRated={handleRate} />
        )}
      </div>

      <RatingButtons onRate={handleRate} />
    </div>
  )
}

export { FlashcardDeck }
