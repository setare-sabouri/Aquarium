import React from 'react'
import styles from "./Interface.module.scss"
import { usePlayerStore } from '../../Store/useGame'
const Interface = () => {
  const TreasureFound=usePlayerStore((state)=>state.TreasureFound)
  return (
    <>
      <div className={styles.Interface}>
        <p>Rotate : Hold Ctrl</p>
      </div>
      {TreasureFound&&
      <div className={styles.EscapeMessage}>
        <p>🤿 Treasure Found 🤿 </p>
        <p>🐬 Gate is open 🐬 </p>
      </div>
      }

    </>

  )
}

export default Interface
