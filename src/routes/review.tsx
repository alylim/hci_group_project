import { createFileRoute } from '@tanstack/react-router'
import { Window } from '@/components/window'
// import { Flashcard } from '@/components/flashcard'
// import { useState } from 'react'
import { FlashcardDeck } from '@/components/flashcard-deck'

export const Route = createFileRoute('/review')({
  component: RouteComponent,
})

const deckDetails = [
  { front: 'What is the capital of france?', back: 'paris' },
  { front: '2+2?', back: '4' },
  {
    front: 'Gulf of execution',
    back: 'distance it takes user to perform action in interface',
  },
  {
    front: 'useState vs useEffect',
    back: 'useEffect for handling side effects, useState for handling reactive state changes',
  },
]

function RouteComponent() {
  // const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="w-screen">
      <div className="py-20 px-40">
        <Window>
          <div>hello review</div>
          <div className="py-40 bg-gray-100">
            <FlashcardDeck data={deckDetails} />
          </div>
        </Window>
      </div>
    </div>
  )
}
