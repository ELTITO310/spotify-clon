import Play from '@/icons/Play'
import Pause from '@/icons/Pause';
import { usePlayerStore } from "@/store/playerStore";
import {allPlaylists, songs as allSongs, type Song} from '@/lib/data'

export const Time = () => {
  return (
    <svg
      role="img"
      height="16"
      width="16"
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="currentColor"
    >
      <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"></path>
      <path d="M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z"></path>
    </svg>
  );
};

interface Props {
  songs: Song[]
}

const MusicTables = ({songs}: Props) => {

  const { currentMusic, setCurrentMusic, setIsPlaying, isPlaying } = usePlayerStore(
    (state) => state
  );

  const handlePlayClick = (song: Song) => {
    if(currentMusic?.song?.id === song.id) {
      const isPlay = isPlaying && currentMusic?.song?.id === song.id
      if(isPlay) {
        setIsPlaying(false)
      } else {
        setIsPlaying(true)
      }
    } else {
      const playlist = allPlaylists.find(pl => pl.albumId === song.albumId) ?? null;
      const songs = allSongs.filter(s => s.albumId === song.albumId)
      setCurrentMusic({songs, playlist, song: song})
      setIsPlaying(true)
    }
    
  };

  return (
    <table className="table-auto text-left min-w-full divide-y divide-gray-500/20">
      <thead>
        <tr className="text-gray-300 text-sm font-light ">
          <th className="px-4 py-2">#</th>
          <th className="px-4 py-2">Title</th>
          <th className="px-4 py-2">Album</th>
          <th className="px-4 py-2">
            <Time />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="h-[16px]"></tr>
        {songs.map((song, i) => {
          const isPlay = isPlaying && currentMusic?.song?.id === song.id
          const isThisMusic = currentMusic?.song?.id === song.id;

          return (
            <tr key={i} className="text-gray-300 text-sm font-light hover:bg-white/10 rounded-lg overflow-hidden transition duration-300 group">
              <td className="relative px-4 py-2 rounded-tl-lg rounded-bl-lg w-2">
                {isPlay ?
                  <img className="group-hover:opacity-0" src="/songPlayAnimation.gif" alt="Song Play Animation" height={16} width={16} />
                  :
                  <span className={`group-hover:opacity-0`}>{i + 1}</span>
                }
                <button className={`absolute top-0 left-0 w-full h-full z-20 text-white opacity-0 group-hover:opacity-100 scale-75 py-2 pl-3`}
                  onClick={() => handlePlayClick(song)}>
                  {isPlay ? <Pause /> : <Play />}
                </button>
              </td>
              <td className="px-4 py-2 flex gap-3">
                <picture>
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-11 h-11"
                  />
                </picture>
                <div className="flex flex-col">
                  <h3 className={`text-base ${isThisMusic ? 'text-green-500' : 'text-white'}`}>{song.title}</h3>
                  <span>{song.artists.join(", ")}</span>
                </div>
              </td>
              <td className="px-4 py-2">{song.album}</td>
              <td className="px-4 py-2 rounded-tr-lg rounded-br-lg">
                {song.duration}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MusicTables;
