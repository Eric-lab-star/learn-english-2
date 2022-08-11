import { useRouter } from "next/router";
import Layer from "../../components/Layer";
import Player from "../../components/Player";
import audioDB from "../../components/db";
import { useEffect, useState } from "react";

interface IDB {
  [audio: string]: string;
}
export default function Question() {
  const [db, setDB] = useState<IDB>();
  const [keys, setKeys] = useState<string[]>();
  const {
    query: { question },
  } = useRouter();
  useEffect(() => {
    if (question) {
      const foundDB = audioDB[`Q${question}`];
      setDB(foundDB);
      const keys = Object.keys(foundDB);

      keys.sort((a: string, b: string) => {
        const A = parseInt(a);
        const B = parseInt(b);
        return A - B;
      });
      setKeys(keys);
    }
  }, [question]);
  return (
    <Layer title={`Question ${question ? question : ""}`}>
      <div className="bg-amber-500 space-y-4 pt-4 h-full">
        {keys ? (
          <div className="bg-amber-500 space-y-4 pt-4">
            {keys?.map((v, i) => {
              return (
                <div key={i}>
                  <div className="text-white font-semibold text-xl">{v}</div>
                  <Player
                    src={`/sound/Q${question}/${v}.wav`}
                    text={db ? db[`${v}`] : "x"}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-white font-medium text-lg flex h-screen justify-center">
            loading data
          </div>
        )}
      </div>
    </Layer>
  );
}
