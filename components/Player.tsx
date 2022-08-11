import ReactHowler from "react-howler";
import { ChangeEvent, useRef, useState } from "react";
import raf from "raf";
export default function Player({ src, text }: { src: string; text: string }) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoaded, setLoad] = useState(true);
  const [duration, setDuration] = useState<number | undefined>(0);
  const sound = useRef<ReactHowler>(null);
  const id = useRef(0);
  const [seek, setSeek] = useState<number | undefined>(0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);

  const clear = () => {
    raf.cancel(id.current);
  };
  const print = () => {
    if (!isSeeking) {
      setSeek(sound.current?.seek());
    }

    id.current = raf(print);
  };

  const onEnd = () => {
    setIsPlaying(false);
    clear();
  };

  const onPlay = () => {
    setIsPlaying(true);
    print();
  };
  const onPause = () => {
    setIsPlaying(false);
    clear();
  };
  const onLoad = () => {
    setDuration(sound.current?.duration());
    setLoad(true);
  };

  const onMouseDown = () => {
    setIsSeeking(true);
  };
  const onMouseUp = () => {
    setIsSeeking(false);
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    if (isSeeking) {
      setSeek(sound.current?.seek(+value));
    }
  };

  return (
    <div>
      {isLoaded ? (
        <div className="flex flex-col items-center space-y-3">
          <ReactHowler
            src={src}
            playing={isPlaying}
            onLoad={onLoad}
            ref={sound}
            onEnd={onEnd}
          />

          <div className=" flex items-center justify-center bg-amber-400 rounded-full">
            {isPlaying ? (
              <button className="" onClick={onPause}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
                  />
                </svg>
              </button>
            ) : (
              <button className="" onClick={onPlay}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="flex flex-col space-y-1 items-center">
            <input
              id="input"
              className="h-5 overflow-hidden appearance-none rounded-xl  bg-amber-400 "
              type={"range"}
              step="0.01"
              min={0}
              max={duration && duration.toFixed(2)}
              value={seek && seek.toFixed(2)}
              onChange={onChange}
              onMouseDown={onMouseDown}
              onMouseUp={onMouseUp}
            />
            <div className="text-white font-semibold flex space-x-1">
              <div>{seek && seek.toFixed(1)}</div> <div>|</div>
              <div>{duration && duration.toFixed(1)}</div>
            </div>
          </div>

          <details className="w-full shadow-md open:ring-1 open:bg-white open:ring-white  open:shadow-lg rounded-md">
            <summary className="text-xl ring-1 ring-amber-600 bg-amber-600 cursor-pointer rounded-md p-3 text-white font-semibold select-none">
              문장 확인
            </summary>
            <div className="p-3 text-base leading-6 text-slate-800 font-semibold">
              <p>{text}</p>
            </div>
          </details>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
}
