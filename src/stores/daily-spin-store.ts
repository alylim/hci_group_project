import { create } from 'zustand'

type DailySpinStore = {
  hasSpun: boolean
  reward: number | null
  spin: (reward: number) => void
  reset: () => void
}

export const useDailySpinStore = create<DailySpinStore>((set) => ({
  hasSpun: false,
  reward: null,
  spin: (reward: number) => set({ hasSpun: true, reward }),
  reset: () => set({ hasSpun: false, reward: null }),
}))
