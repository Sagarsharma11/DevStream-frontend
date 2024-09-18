import React from "react";
import styles from "./SkeletonLoader.module.css"; // Import CSS Module

// Skeleton Loader Component
const SkeletonLoader = ({ count }: { count: number }) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="flex flex-wrap gap-10 items-center justify-between w-full border">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className={`  ${styles.skeletonCard} ${styles.pulse} `} 
        >
          <div className={styles.skeletonCardTop}></div> {/* Top part */}
          <div className={styles.skeletonCardContent}>
            <div className={styles.skeletonCardContentLine}></div>
            <div className={styles.skeletonCardContentLine}></div> 
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
