"use client"
import Player from "./components/HomeComponents/Player/Player";
import programming_tutorials from "../utils/programming_tutorials.json";

export default function Home() {
console.log("total videos",programming_tutorials.length)
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24 gap-3 flex-wrap">
      {
          // [1,2,3,4,5,6,7,8 ,9,0]
      programming_tutorials.map((ele, key) => (
        <div key={key}>
          {/* <p>{ele?.title}</p> */}
          <Player data={ele} />
        </div>
      ))}
    </main>
  );
}
