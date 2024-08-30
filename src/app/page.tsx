import Card from "./components/HomeComponents/Card/Card";
import programming_tutorials from "../utils/programming_tutorials.json";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24 gap-3 flex-wrap">
      {
          // [1,2,3,4,5,6,7,8 ,9,0]
      programming_tutorials.slice(0,11).map((ele, key) => (
        
        <div key={key}>
          <Card data={ele} />
        </div>
      ))}
    </main>
  );
}
