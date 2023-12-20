import { usePlayerStore } from "@/store/playerStore";
import { Slider } from "@/components/Slider";
import { useRef } from "react";
import { Volume, VolumeSilence } from "@/icons/Volume";

const VolumeControl = () => {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const previusVolumeRef = useRef(volume);

  const isSilence = volume * 100 < 0.1;

  const handleClickVolume = () => {
    if (isSilence) {
      setVolume(previusVolumeRef.current);
    } else {
      previusVolumeRef.current = volume;
      setVolume(0);
    }
  };

  return (
    <div className="flex justify-center gap-x-2 text-white">
      <button
        onClick={handleClickVolume}
        className="opacity-70 hover:opacity-100 transition"
      >
        {isSilence ? <VolumeSilence /> : <Volume />}
      </button>
      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        value={[volume * 100]}
        className="w-[95px]"
        onValueChange={(value) => {
          const [newVolume] = value;
          const volumeValue = newVolume / 100;
          setVolume(volumeValue);
        }}
      />
    </div>
  );
};

export default VolumeControl;
