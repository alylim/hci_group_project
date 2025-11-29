import { create } from 'zustand'

type AudioStore = {
  isMuted: boolean
  toggleMute: () => void
  setMuted: (muted: boolean) => void
}

export const useAudioStore = create<AudioStore>((set) => ({
  isMuted: false,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setMuted: (muted: boolean) => set({ isMuted: muted }),
}))
