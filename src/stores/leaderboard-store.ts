import { create } from 'zustand'

type Friend = {
  id: string
  name: string
  points: number
  streak: number
  cardsCompleted: number
  trend: 'up' | 'down' | 'same'
  isYou?: boolean
}

const initialFriends: Array<Friend> = [
  {
    id: '1',
    name: 'Alice',
    points: 922,
    streak: 21,
    cardsCompleted: 356,
    trend: 'same',
  },
  {
    id: '2',
    name: 'Georgia',
    points: 856,
    streak: 21,
    cardsCompleted: 319,
    trend: 'up',
    isYou: true,
  },
  {
    id: '3',
    name: 'Charlie',
    points: 834,
    streak: 20,
    cardsCompleted: 309,
    trend: 'down',
  },
  {
    id: '4',
    name: 'David',
    points: 788,
    streak: 18,
    cardsCompleted: 287,
    trend: 'up',
  },
  {
    id: '5',
    name: 'Emma',
    points: 756,
    streak: 19,
    cardsCompleted: 275,
    trend: 'same',
  },
  {
    id: '6',
    name: 'Frank',
    points: 723,
    streak: 15,
    cardsCompleted: 264,
    trend: 'down',
  },
  {
    id: '7',
    name: 'Grace',
    points: 698,
    streak: 17,
    cardsCompleted: 251,
    trend: 'up',
  },
  {
    id: '8',
    name: 'Henry',
    points: 672,
    streak: 14,
    cardsCompleted: 243,
    trend: 'down',
  },
  {
    id: '9',
    name: 'Ivy',
    points: 645,
    streak: 16,
    cardsCompleted: 232,
    trend: 'same',
  },
  {
    id: '10',
    name: 'Jack',
    points: 623,
    streak: 13,
    cardsCompleted: 221,
    trend: 'up',
  },
]

type LeaderboardStore = {
  friends: Array<Friend>
  showRankUpBadge: boolean
  addPoints: (points: number) => void
  setShowRankUpBadge: (show: boolean) => void
  reset: () => void
}

export const useLeaderboardStore = create<LeaderboardStore>((set) => ({
  friends: initialFriends,
  showRankUpBadge: false,
  addPoints: (points: number) =>
    set((state) => {
      const updatedFriends = state.friends.map((friend) => {
        if (friend.isYou) {
          return {
            ...friend,
            points: friend.points + points,
            trend: 'up' as const,
          }
        }
        return friend
      })

      updatedFriends.sort((a, b) => b.points - a.points)

      // Check if user is now rank 1
      const isNowFirst = updatedFriends[0]?.isYou

      return {
        friends: updatedFriends,
        showRankUpBadge: isNowFirst || false,
      }
    }),
  setShowRankUpBadge: (show: boolean) => set({ showRankUpBadge: show }),
  reset: () => set({ friends: initialFriends, showRankUpBadge: false }),
}))
