import React from 'react';
import styles from "./PrimaryLayout.module.css"

const PrimaryLayout = ({children}:any) => {
  return (
    <div className={`border ${styles["main--container"]}`}>{children}</div>
  )
}

export default PrimaryLayout