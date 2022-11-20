import React from 'react';
import styles from './Title.module.scss';

const Title = () => {
  return (
    <h1 className={styles.title}>
        <span className={styles.spanRed}>Планировщик</span>
        <span className={styles.spanBlack}>Задач</span> </h1>
  )
}

export default Title;