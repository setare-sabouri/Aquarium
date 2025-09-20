import styles from "./Interface.module.scss";
import { usePlayerStore } from '../../Store/useGame';
import useBreakpoint from "../../Utils/useBreakpoint";

const Interface = ({ playerRef }) => {
  const TreasureFound = usePlayerStore((state) => state.TreasureFound);
  const resetStore = usePlayerStore((state) => state.resetStore);
  const breakpoint = useBreakpoint()
  
  const handleReset = () => {
    resetStore();
    if (playerRef.current) {
      playerRef.current.setTranslation({ x: 0, y: 3, z: -10 }, true);
      playerRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      playerRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  };

  return (
    <>
      <div className={`${styles.Interface}  ${breakpoint ==='desktop'? styles.desktop : styles.mobile}`}>
        <p>Exit: ESC</p>
        <p>Jump : Space</p>
      </div>
      {TreasureFound && (
        <div className={`${styles.EscapeMessage} ${breakpoint==='desktop'? styles.desktop : styles.mobile}`}>
          <p>🤿 Treasure Found 🤿 </p>
          <p>🐬 Gate is open 🐬 </p>
          <button onClick={handleReset}>Restart</button>
        </div>
      )}
    </>
  );
};

export default Interface;
