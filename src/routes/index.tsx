import { createFileRoute, Link } from '@tanstack/react-router'

import { Separator } from '@/components/ui/separator'
import { Window } from '@/components/window'
import { Banana } from 'lucide-react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="w-screen">
      <div className="py-20 px-40">
        <Window>
          <div className="border rounded-md p-4">
            <div className="grid grid-cols-5 font-bold text-sm">
              <div>Decks</div>
              <div>Status</div>
              <div>New</div>
              <div>Learn</div>
              <div>Due</div>
            </div>
            <Separator orientation="horizontal" />

            <div className="grid grid-cols-5 text-sm">
              <Link to="/review">Latin</Link>
              <div>due</div>
              <div>new</div>
              <div>learn</div>
              <div>due</div>
            </div>

            <div className="grid grid-cols-5 text-sm">
              <Link to="/review">Latin</Link>
              <div>
                <Banana className="text-red-500" />
              </div>
              <div>new</div>
              <div>learn</div>
              <div>due</div>
            </div>
          </div>
        </Window>
      </div>
    </div>
  )
}
