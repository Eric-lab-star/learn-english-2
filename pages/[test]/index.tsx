import Link from "next/link";
import { useRouter } from "next/router";
import Layer from "../../components/Layer";

export default function Chapter() {
  const {
    query: { test },
  } = useRouter();

  return (
    <Layer title={`Test ${test}`}>
      <div className="space-y-3 mt-5">
        {[1, 2, 3, 4].map((v, i) => (
          <Link key={i} href={`${test}/${v}`}>
            <div className="h-10 cursor-pointer flex justify-center items-center font-semibold bg-amber-600 rounded-md shadow-md text-white">
              Question {v}
            </div>
          </Link>
        ))}
      </div>
    </Layer>
  );
}
