import Link from "next/link";
import { useRouter } from "next/router";
import Layer from "../../components/Layer";
import audioDB from "../../components/db";
import { useEffect, useState } from "react";
export default function Chapter() {
  const [questions, setQuestsion] = useState<string[]>();
  const {
    query: { test },
  } = useRouter();
  useEffect(() => {
    setQuestsion(Object.keys(audioDB));
  }, []);
  return (
    <Layer title={`Test ${test}`}>
      <div className="space-y-3 mt-5 h-full">
        {questions?.map((v, i) => (
          <Link key={i} href={`${test}/${v}`}>
            <div className="h-10 cursor-pointer flex justify-center items-center font-semibold bg-amber-600 rounded-md shadow-md text-white">
              듣기 {v}
            </div>
          </Link>
        ))}
      </div>
    </Layer>
  );
}
