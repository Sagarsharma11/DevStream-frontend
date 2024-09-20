"use client";
import Player from "./components/HomeComponents/Player/Player";
import { useEffect, useState } from "react";
import SkeletonLoader from "./components/SkeletonLoader/SkeletonLoader";
import { uniqueRandomArray } from "@/utils/uniqueRandomArray";

import styles from "./page.module.css"
import PrimaryLayout from "@/utils/components/PrimaryLayout";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true); // Loading state
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("")
  const [limit, setLimit] = useState(12)



  // Fetch data from API with the current offset
  const fetchData = async (currentOffset: number) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `https://devstream-backend.onrender.com/api/v1/videos/get-all-data?limit=${limit}&offset=${currentOffset}`
        // `http://localhost:8000/api/v1/videos/get-all-data?limit=${limit}&offset=${currentOffset}&search=${search}`
      );
      const result = await response.json();

      if (result.data.length > 0) {
        setData([...data, ...result.data]);
        // if(search){
        //   const dataArray = uniqueRandomArray(result.data)
        //   setData(dataArray); // Append new data to existing data
        // }else{
        //   const dataArray = uniqueRandomArray([...data, ...result.data])
        //   setData(dataArray); 
        // }

      } else {
        setHasMore(false); // No more data to load
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // End loading
    }
  };



  // Infinite scroll detection
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;

    if (windowHeight + scrollTop >= documentHeight - 10 && hasMore) {
      // Increment offset, which will trigger the useEffect
      setOffset((prev) => prev + limit);
    }
  };

  useEffect(() => {
    if (hasMore) {
      // const debounceTimeout = setTimeout(() => {
        fetchData(offset);
      // }, 1000);

      // Cleanup function to clear timeout if dependencies change
      // return () => clearTimeout(debounceTimeout);
    }
  }, [offset, hasMore]);

  // Handle scroll event
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore]);

  // Handle video play state
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const handlePlay = (index: number) => {
    setCurrentPlaying(index);
  };

  return (
    <PrimaryLayout>
      <main className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row px-6 md:px-12 lg:px-24 py-5 gap-4 md:gap-10 w-full justify-between">
          <p className="text-neon-color text-lg md:text-xl lg:text-2xl">
            Dev Stream
          </p>
          <div className="flex flex-col w-full md:w-60 gap-2 md:gap-4">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
                setLimit(10);
              }}
              className="border border-neon-color bg-primary-color rounded-sm text-neon-color px-2 py-1"
              placeholder="Search by keywords"
              type="text"
            />
            <div className="h-4">
              {search && (
                <p className="text-red-700 text-sm">
                  We are working hard for your better experience
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex min-h-screen flex-row items-center justify-center lg:justify-between px-6 md:px-12 lg:px-24 gap-4 md:gap-5 flex-wrap">
          {loading && offset === 0 ? (
            // Show skeleton loader while the first batch of data is being loaded
            <SkeletonLoader count={limit} />
          ) : data.length > 0 ? (
            data.map((ele, index) => (
              <div
                onClick={() => handlePlay(index)}
                onMouseLeave={() => setCurrentPlaying(null)}
                key={index}
                className={`${styles["video-card"]} flex flex-col gap-5 p-2 shadow justify-center border-primary-color border rounded md:w-1/2 lg:w-1/3`}
              >
                <Player play={currentPlaying === index} data={ele} index={index} />
                <div className="w-full h-16 text-neon-color">
                  {ele?.title}
                </div>
                <div className="bg-primary-color rounded-md flex flex-row justify-between items-center p-2">
                  <div className="text-sm text-white">
                    {ele?.channelName?.substring(0, 10)}
                  </div>
                  <div className="text-sm text-white">
                    {ele?.views} | {(ele.uploadTime.includes("Streamed")) ? ele.uploadTime.replace(/Streamed/g, '') : ele.uploadTime}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No more items to load</div>
          )}

          {loading && offset > 0 && (
            <SkeletonLoader count={3} />
          )}
        </div>
      </main>
    </PrimaryLayout>
  );
}
