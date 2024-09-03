"use client";
import React from "react";
import styles from "./Player.module.css";
import ReactPlayer from "react-player/youtube";

type Props = {
  data: {
    url: string;
    title: string;
    thumbnailUrl?: string;
  };
  play: boolean;
  index:number
};

const Player: React.FC<Props> = (props) => {
  const { url, title, thumbnailUrl } = props.data;
  const play = props.play;

  function convertToEmbedUrl(youtubeUrl: string): string {
    const regex = /https:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
    const match = youtubeUrl.match(regex);
    if (match && match[1]) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return "";
  }
  const random = Math.floor(Math.random() * 4)+1; // Generates a random integer between 0 and 3
  const customThumbnail = `image/${random}.jpg`;
  return (
    <div className={`${play?"shadow-md":""} cursor-pointer ${styles["container-size"]}`}>
      {play ? (
        // ReactPlayer will be displayed if 'play' is true
        <ReactPlayer
          width="100%" 
          height="100%" 
          playing={play}
          url={url}
          controls={true}
          title={title}
        />
      ) : (
        <div className={styles["image-container"]}>
          <img
            src={thumbnailUrl ? thumbnailUrl : customThumbnail}
            alt={title}
            className={styles["thumbnail"]}
          />
          {/* Overlay to display on top of the image */}
          <div className={styles["overlay"]}>
            <div className={styles["text-container"]}>
              
            <small>  {title.substring(0,30)}</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;



        // <iframe
        //   src={convertToEmbedUrl(url)}
        //   allowFullScreen
        //   title={title}
        //   ></iframe>

