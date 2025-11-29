import { useState } from 'react'
import { Clover, Minus, TrendingDown, TrendingUp } from 'lucide-react'
import { DailySpinModal } from './daily-spin'
import { Button } from '@/components/ui/button'
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/ui/item'
import { useDailySpinStore } from '@/stores/daily-spin-store'
import { useLeaderboardStore } from '@/stores/leaderboard-store'

type Friend = {
  id: string
  name: string
  points: number
  streak: number
  cardsCompleted: number
  trend: 'up' | 'down' | 'same'
  isYou?: boolean
}

function getRankBadge(rank: number) {
  const baseClasses = 'flex items-center justify-center font-bold text-lg'

  if (rank === 1) {
    return (
      <div
        className={`${baseClasses} size-10 rounded-full bg-yellow-400 text-yellow-900`}
      >
        {rank}
      </div>
    )
  }
  if (rank === 2) {
    return (
      <div
        className={`${baseClasses} size-10 rounded-full bg-gray-300 text-gray-700`}
      >
        {rank}
      </div>
    )
  }
  if (rank === 3) {
    return (
      <div
        className={`${baseClasses} size-10 rounded-full bg-orange-400 text-orange-900`}
      >
        {rank}
      </div>
    )
  }
  return (
    <div className={`${baseClasses} size-10 text-muted-foreground`}>{rank}</div>
  )
}

function getTrendIcon(trend: Friend['trend']) {
  if (trend === 'up') {
    return <TrendingUp className="text-green-600" size={18} />
  }
  if (trend === 'down') {
    return <TrendingDown className="text-red-600" size={18} />
  }
  return <Minus className="text-gray-400" size={18} />
}

function Leaderboard() {
  const [showDailySpin, setShowDailySpin] = useState(false)
  const { hasSpun, reward } = useDailySpinStore()
  const friends = useLeaderboardStore((state) => state.friends)

  const handleDailySpinClick = () => {
    setShowDailySpin(true)
  }

  return (
    <div className="w-full mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <Button
          onClick={handleDailySpinClick}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all"
        >
          <Clover className="mr-2" size={18} />
          {hasSpun ? 'View Reward' : 'Daily Spin'}
        </Button>
      </div>

      {/* Active Multiplier Badge - Only shows after spinning */}
      {reward && (
        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-200">
          <div className="flex items-center justify-center gap-2">
            <Clover className="text-green-600" size={20} />
            <p className="text-sm font-medium text-green-900">
              Active Multiplier:{' '}
              <span className="text-lg font-bold">{reward}x</span> points today!
            </p>
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
        {friends.map((friend, index) => {
          const rank = index + 1
          const isHighlighted = friend.isYou

          return (
            <Item
              key={friend.id}
              variant={isHighlighted ? 'muted' : 'outline'}
              className={
                isHighlighted ? 'border-2 border-cyan-500 bg-cyan-50/50' : ''
              }
            >
              <ItemMedia variant="default">{getRankBadge(rank)}</ItemMedia>

              <ItemContent>
                <ItemTitle>
                  {friend.name}
                  {friend.isYou && (
                    <span className="ml-2 text-xs font-normal text-cyan-600 bg-cyan-100 px-2 py-0.5 rounded-full">
                      You
                    </span>
                  )}
                </ItemTitle>
                <ItemDescription>
                  {friend.streak} days streak · {friend.cardsCompleted} cards
                  completed
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <div className="flex items-center gap-3">
                  {getTrendIcon(friend.trend)}
                  <div className="text-right">
                    <div className="text-lg font-bold">{friend.points}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              </ItemActions>
            </Item>
          )
        })}
      </div>

      {/* Daily Spin Modal */}
      <DailySpinModal
        isOpen={showDailySpin}
        onClose={() => setShowDailySpin(false)}
      />
    </div>
  )
}

export { Leaderboard }
