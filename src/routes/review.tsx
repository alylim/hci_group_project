import { createFileRoute } from '@tanstack/react-router'
import { Window } from '@/components/window'
// import { Flashcard } from '@/components/flashcard'
// import { useState } from 'react'
// import FlashcardDeck from '@/components/flashcard-deck'

export const Route = createFileRoute('/review')({
  component: RouteComponent,
})

function RouteComponent() {
  //   const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="w-screen">
      <div className="py-20 px-40">
        <Window>
          <div>hello review</div>
          <div className="py-40 bg-gray-100">{/* <FlashcardDeck /> */}</div>
        </Window>
      </div>
    </div>
  )
}
