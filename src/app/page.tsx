"use client"
import Player from "./components/HomeComponents/Player/Player";
import programming_tutorials from "../utils/programming_tutorials.json";
import { useEffect, useState, useCallback } from "react";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [offset, setOffset] = useState(0);
  const limit = 10; // Number of items to fetch per request

  // Fetch data from API
  const fetchData = useCallback(async () => {
      try {
          const response = await fetch(`http://localhost:8000/api/v1/videos/get-all-data?offset=${offset}`);
          const result = await response.json();
          if (result.data.length > 0) {
              setData(result.data);
          } 
      } catch (error) {
          console.error('Error fetching data:', error);
      } 
  },[]);

  useEffect(() => {
    fetchData();
}, []);



  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);

  const handlePlay = (index: number) => {
    setCurrentPlaying(index); // Set the current video index as playing
  };

  console.log("total videos", programming_tutorials.length)
  return (
    <main className="flex min-h-screen flex-row items-center justify-between p-24 gap-10 flex-wrap">
      {
        // [1,2,3,4,5,6,7,8 ,9,0]
        data.length?
        data?.map((ele:any, index:number) => (
          <div onClick={() => handlePlay(index)} onMouseLeave={()=>setCurrentPlaying(null)} key={index}>
            <Player
              play={currentPlaying === index}
              data={ele}
              index={index}
            />
            <div className="bg-slate-800 flex flex-row justify-between items-center">
              
              <div className="text-sm text-white p-2">
                {ele.channelName.substring(0,10)}
              </div>
              <div className="text-sm text-white p-2">
                  {ele.views} | {ele.uploadTime}
              </div>
            </div>
          </div>
        )):""}
    </main>
  );
}
