import { useKeyboardControls } from "@react-three/drei";
import styles from './MobileControls.module.scss';

const MobileControls = () => {
  const setKey = useKeyboardControls((state) => state);

  const handleDown = (key) => setKey[key] = true;
  const handleUp = (key) => setKey[key] = false;

  return (
    <div className={styles.mobileControls}>
      <button 
        className={styles.button} 
        onTouchStart={() => handleDown('forward')} 
        onTouchEnd={() => handleUp('forward')}
      >↑</button>

      <button 
        className={styles.button} 
        onTouchStart={() => handleDown('backward')} 
        onTouchEnd={() => handleUp('backward')}
      >↓</button>

      <button 
        className={styles.button} 
        onTouchStart={() => handleDown('left')} 
        onTouchEnd={() => handleUp('left')}
      >←</button>

      <button 
        className={styles.button} 
        onTouchStart={() => handleDown('right')} 
        onTouchEnd={() => handleUp('right')}
      >→</button>

      <button 
        className={`${styles.button} ${styles.jump}`} 
        onTouchStart={() => handleDown('jump')} 
        onTouchEnd={() => handleUp('jump')}
      >Jump</button>
    </div>
  );
};

export default MobileControls;
