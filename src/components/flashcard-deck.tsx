import { AnimatePresence } from 'framer-motion'
import { Card } from './flashcard'
import type { Flashcard, Rating } from './flashcard'

type FlashcardDeckProps = {
  currentCard: Flashcard
  nextCard?: Flashcard
  hasNextCard: boolean
  isFlipped: boolean
  rating?: Rating | null
  progressBarRef?: React.RefObject<HTMLDivElement | null>
}

function FlashcardDeck({
  currentCard,
  nextCard,
  hasNextCard,
  isFlipped,
  rating,
  progressBarRef,
}: FlashcardDeckProps) {
  return (
    <div className="relative w-[340px] h-[480px]">
      {/* Background card - show next card preview */}
      {hasNextCard && nextCard && (
        <div className="absolute inset-0 -rotate-2 scale-95 opacity-40">
          <Card card={nextCard} staticCard />
        </div>
      )}

      {/* Active card */}
      <AnimatePresence mode="popLayout">
        <Card
          key={currentCard.id}
          card={currentCard}
          flipped={isFlipped}
          rating={rating}
          progressBarElement={progressBarRef?.current}
        />
      </AnimatePresence>
    </div>
  )
}

export { FlashcardDeck }
