import { useRouter } from "next/router";
import Layer from "../../components/Layer";
import Player from "../../components/Player";

export default function Question() {
  const {
    query: { question },
  } = useRouter();

  return (
    <Layer title={`Question ${question}`}>
      <div className="bg-amber-500 space-y-4 pt-4">
        {[1, 2, 3, 5].map((v, i) => {
          return (
            <div key={i}>
              <div className="text-white font-semibold text-xl">{i + 1}</div>
              <Player src={`/sound/Q1/01.wav`} text={"hello"} />
            </div>
          );
        })}
      </div>
    </Layer>
  );
}
