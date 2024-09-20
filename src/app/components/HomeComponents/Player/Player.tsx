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
  index: number
};

const Player: React.FC<Props> = (props) => {
  const { url, title, thumbnailUrl } = props.data;
  const play = props.play;

  const random = Math.floor(Math.random() * 4) + 1; 
  const customThumbnail = `image/${random}.jpg`;
  return (
    <div className={`${play ? "shadow-md" : ""} cursor-pointer ${styles["container-size"]}`}>
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
            className={` ${styles["thumbnail"]} object-cover w-full h-full`}
          />
          {/* Overlay to display on top of the image */}
          <div className={styles["overlay"]}>
            <div className={styles["text-container"]}>

              <small>  {title}  </small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
