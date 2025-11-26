import { createFileRoute } from '@tanstack/react-router'
import { Window } from '@/components/window'
import { Leaderboard } from '@/components/leaderboard'

export const Route = createFileRoute('/challenge')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="w-screen">
      <div className="py-20 px-40">
        <Window>
          <div className="space-y-6">
            <div className="text-center space-y-2">
            </div>

            <Leaderboard />
          </div>
        </Window>
      </div>
    </div>
  )
}