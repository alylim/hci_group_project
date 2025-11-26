import { useEffect, useState } from 'react'
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
  const [behindCard, setBehindCard] = useState<Flashcard | undefined>(nextCard)
  const [queuedBehind, setQueuedBehind] = useState<Flashcard | undefined>(
    nextCard,
  )
  const [showBehind, setShowBehind] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [prevCardId, setPrevCardId] = useState<string | undefined>(undefined)

  useEffect(() => {
    setQueuedBehind(nextCard)
  }, [nextCard?.id])

  useEffect(() => {
    if (prevCardId && prevCardId !== currentCard?.id) {
      setIsTransitioning(true)
    }
    setPrevCardId(currentCard?.id)
  }, [currentCard?.id])

  useEffect(() => {
    if (isFlipped && nextCard) {
      setShowBehind(true)
    }
  }, [isFlipped, nextCard?.id])

  const hasLogicalNext = !!nextCard
  const shouldShowBehind =
    !!behindCard && (showBehind || isTransitioning) && hasLogicalNext

  return (
    <div className="relative w-[340px] h-[220px]">
      {shouldShowBehind && (
        <div className="absolute inset-0 scale-[0.96] translate-y-2 opacity-40 pointer-events-none transition-opacity duration-200">
          <Card card={behindCard} staticCard />
        </div>
      )}

      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          setBehindCard(queuedBehind)
          setShowBehind(false)
          setIsTransitioning(false)
        }}
      >
        {currentCard && (
          <Card key={currentCard.id} card={currentCard} flipped={isFlipped} />
        )}
      </AnimatePresence>
    </div>
  )
}

export { FlashcardDeck }
