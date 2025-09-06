import React from 'react';
import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.dash} ${styles.uno}`}></div>
      <div className={`${styles.dash} ${styles.dos}`}></div>
      <div className={`${styles.dash} ${styles.tres}`}></div>
      <div className={`${styles.dash} ${styles.cuatro}`}></div>
    </div>
  );
};

export default Loading;