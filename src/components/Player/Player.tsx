import { usePlayerStore } from "@/store/playerStore";
import { useEffect, useRef } from "react";
import Play from '@/icons/Play';
import Pause from '@/icons/Pause';
import SongControl from './SongControl';
import VolumeControl from './VolumeControl';
import CurrentSong from './CurrentSong'
import { Back, Next } from "@/icons/Skip";

const Player = () => {
  const {currentMusic, isPlaying, setIsPlaying, volume, setCurrentMusic, currentTime, setCurrentTime} = usePlayerStore(state => state)
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioRef?.current?.addEventListener('ended', handleEnded)
    return () => audioRef?.current?.removeEventListener('ended', handleEnded)
  })

  useEffect(() => {
    if(audioRef.current) {
      audioRef.current.currentTime = currentTime
    }
    setIsPlaying(false)
  }, [])

  useEffect(() => {
    isPlaying 
      ? audioRef?.current?.play()
      : audioRef?.current?.pause()
  }, [isPlaying])

  useEffect(() => {
    audioRef.current ? audioRef.current.volume = volume : () => {}
  }, [volume])

  useEffect(() => {
    if(audioRef.current) {
      const {song, playlist, songs} = currentMusic;
      if(song) {
        setCurrentTime(0)
        const src = `/music/${playlist?.id}/0${song.id}.mp3`
        audioRef.current.src = src
        audioRef.current.volume = volume
        isPlaying ? audioRef?.current?.play() : audioRef?.current?.pause()
      }
    }
  }, [currentMusic])

  const handleEnded = () => {
    const {song: songM, playlist, songs} = currentMusic;
    const nextSong = songs.find(songF => songF.id === (songM?.id! +1))
    if(nextSong) {
      setCurrentMusic({songs, playlist, song: nextSong})
    }
  }

  const handleClick = () => {
    if(isPlaying) {
        audioRef?.current?.pause()
    } else {
        audioRef?.current?.play()
    }

    setIsPlaying(!isPlaying)
  }

  const skip = (is: 'back' | 'next') => {
    if(is === 'back') {
      const {song: songM, playlist, songs} = currentMusic;
      const number = songM?.id! - 1
      if(number < 0) {
        const nextSong = songs.find(songF => songF.id === number)
        if(nextSong) {
          setCurrentMusic({songs, playlist, song: nextSong})
        }
      }
    } else {
      const {song: songM, playlist, songs} = currentMusic;
      const number = songM?.id! + 1
      if(number > songs.length) {
        const nextSong = songs.find(songF => songF.id === (songM?.id! + 1))
        if(nextSong) {
          setCurrentMusic({songs, playlist, song: nextSong})
        }
      }
    }
  }


  return (
    <div className="flex flex-row justify-between items-center w-full px-0.5 z-50">
      <div className="w-[200px]">
        <CurrentSong title={currentMusic.song?.title} image={currentMusic.song?.image} artists={currentMusic.song?.artists} />
      </div>
      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row gap-x-8">
            <button className="text-zinc-400 hover:text-white transition duration-300" onClick={() => skip('back')}>
              <Back />
            </button>
            <button className="bg-white rounded-full p-2 text-black" onClick={handleClick}>
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button className="text-zinc-400 hover:text-white transition duration-300" onClick={() => skip('next')}>
              <Next />
            </button>
          </div>
          <SongControl audio={audioRef} />
          <audio ref={audioRef} />
        </div>
      </div>

      <div className="grid place-content-center">
        <VolumeControl />
      </div>
    </div>
  );
};

export default Player;
