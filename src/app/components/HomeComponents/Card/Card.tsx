"use client"
import React from "react";

type Props = {};

const Card = (props: any) => {
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
  console.log("url => ",props.data.url)
  return <div className="container mx-auto bg-slate-500">
    <iframe src={convertToEmbedUrl(props.data.url)} width="width" height="height" frameBorder="border" allowFullScreen={true}></iframe>

  </div>;
};

export default Card;
