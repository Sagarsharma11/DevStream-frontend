"use client"
import React from "react";
import ReactPlayer from 'react-player/youtube'
// import ReactPlayer from 'react-player'

type Props = {};

const Player = (props: any) => {
  function convertToEmbedUrl(youtubeUrl:string) {
    const regex = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const match = youtubeUrl.match(regex);
    if (match && match[1]) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}`;
    } else {
      return ""
    }
  }
  const {url, title} = props.data;
  console.log("url => ",url)
  return <div className="container mx-auto bg-slate-500 rounded-md">
    {/* <iframe className="rounded-md" src={convertToEmbedUrl(props.data.url)} width="100%" height="100%" allowFullScreen={true}></iframe> */}
    
    <ReactPlayer height={200} width={400} url={url} controls={true} title={title} />
  </div>;
};

export default Player;
