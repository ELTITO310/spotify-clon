import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
import { type Playlist, type Song } from '@/lib/data'

interface PlayerStore {
  isPlaying: boolean,
  currentMusic: {
    playlist: Playlist | null,
    song: Song | null,
    songs: Song[]
  },
  volume: number,
  currentTime: number,
  setCurrentTime: (currentTime: number) => void,
  setVolume: (volume: number) => void,
  setIsPlaying: (isPlaying: boolean) => void,
  setCurrentMusic: (currentMusic: {
    playlist: Playlist | null,
    song: Song,
    songs: Song[]
  }) => void
}

export const usePlayerStore = create<PlayerStore>()(persist((set) => ({
  isPlaying: false,
  currentMusic: { playlist: null, song: null, songs: [] },
  volume: 1,
  currentTime: 0,
  setCurrentTime: (currentTime) => set({currentTime}),
  setVolume: (volume) => set({volume}),
  setIsPlaying: (isPlaying) => set({isPlaying}),
  setCurrentMusic: (currentMusic) => set({currentMusic})
}), {
  name: 'music-storage',
}));
