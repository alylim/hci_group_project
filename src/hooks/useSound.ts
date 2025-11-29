import { useEffect, useRef } from 'react'
import { useAudioStore } from '@/stores/audio-store'

function useSound(soundFile: string, volume: number = 0.5) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const isMuted = useAudioStore((state) => state.isMuted)

  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}${soundFile}`)
    audio.volume = volume // Set volume (0.0 to 1.0)
    audio.preload = 'auto' // Preload the audio
    audioRef.current = audio
  }, [soundFile, volume])

  const play = (maxDuration?: number) => {
    if (isMuted) return
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current
        .play()
        .catch((err) => console.error('Error playing sound:', err))
    }

    if (maxDuration) {
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }
      }, maxDuration)
    }
  }

  return play
}

export { useSound }
