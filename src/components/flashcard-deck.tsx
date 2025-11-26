// flashcard-deck.tsx
import { AnimatePresence } from 'framer-motion'
import { Card } from './flashcard'
import type { Flashcard } from './flashcard'

type FlashcardDeckProps = {
  currentCard?: Flashcard
  nextCard?: Flashcard
  isFlipped: boolean
}

function FlashcardDeck({
  currentCard,
  nextCard,
  isFlipped,
}: FlashcardDeckProps) {
  return (
    <div className="relative w-[340px] h-[220px]">
      {/* Behind card: always there if nextCard exists, but fades in when flipped */}
      {nextCard && (
        <div
          className={`absolute inset-0 scale-[0.96] translate-y-2 pointer-events-none transition-opacity duration-200 ${
            isFlipped ? 'opacity-70' : 'opacity-0'
          }`}
        >
          <Card card={nextCard} staticCard />
        </div>
      )}

      {/* Animated current card */}
      <AnimatePresence mode="wait">
        {currentCard && (
          <Card key={currentCard.id} card={currentCard} flipped={isFlipped} />
        )}
      </AnimatePresence>
    </div>
  )
}

export { FlashcardDeck }
