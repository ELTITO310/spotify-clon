import {usePlayerStore} from '@/store/playerStore'
import {useEffect, type RefObject} from 'react'
import {Slider} from '@/components/Slider'

interface Props {
    audio: RefObject<HTMLAudioElement>
}

const SongControl = ({audio}: Props) => {

    const audioCurrent = audio.current;

    if(!audioCurrent) return <></>

    const currentTime = usePlayerStore(state => state.currentTime);
    const setCurrentTime = usePlayerStore(state => state.setCurrentTime)
  
    useEffect(() => {
        audioCurrent.addEventListener('timeupdate', handleTimeUpdate)
  
      return () => {
        audioCurrent.removeEventListener('timeupdate', handleTimeUpdate)
      }
    })
  
    const handleTimeUpdate = () => {
      setCurrentTime(audioCurrent.currentTime)
    }
    
    const formatTime = (time: number) => {
      if(time == 0) return '0:00'
  
      const seconds = Math.floor(time % 60);
      const minutes = Math.floor(time / 60);
  
      return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
  
    const duration = audioCurrent.duration ?? 0
  
    return (
      <div className="flex gap-x-3 text-xs pt-2">
        <span className="opacity-50 w-12 text-right">{formatTime(currentTime)}</span>
        <Slider
          value={[currentTime]}
          max={audio?.current?.duration ?? 0}
          min={0}
          className="w-[400px]"
          onValueChange={(value) => {
            const [newCurrentTime] = value
            audioCurrent.currentTime = newCurrentTime
          }}
        />
        <span className="opacity-50 w-12">{ duration ? formatTime(duration) : '0:00'}</span>
      </div>
    )
}

export default SongControl;