import type { NextPage } from "next";
import Link from "next/link";
import Layer from "../components/Layer";
const Home: NextPage = () => {
  return (
    <Layer title="Home">
      <div className="space-y-3 mt-5 h-screen">
        {[1].map((v, i) => (
          <Link key={i} href={`/${v}`}>
            <div className="h-10 cursor-pointer flex justify-center items-center font-semibold bg-amber-600 rounded-md shadow-md text-white">
              영어 듣기 2회
            </div>
          </Link>
        ))}
      </div>
    </Layer>
  );
};

export default Home;
