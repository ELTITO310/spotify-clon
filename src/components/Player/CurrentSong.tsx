interface Props {
  image: string | undefined;
  title: string | undefined;
  artists: string[] | undefined;
}

const CurrentSong = ({ image, title, artists }: Props) => {
  return (
    <div className="relative flex items-center gap-5 overflow-hidden">
      <picture className="w-16 h-16 bg-zinc-800 rounded-md shadow-lg overflow-hidden">
        <img src={image} alt={title} />
      </picture>

      <div>
        <h3 className="font-semibold text-sm block">{title}</h3>
        <span className="text-xs opacity-80">{artists?.join(", ")}</span>
      </div>
    </div>
  );
};

export default CurrentSong;
