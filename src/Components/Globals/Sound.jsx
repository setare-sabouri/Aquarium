import { useEffect, useState } from 'react';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const BackgroundAudio = ({ src = './audio/AQsound.mp3' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(() => new Audio(src));

  useEffect(() => {
    audio.volume = 0.5;

    const handleFirstKey = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn("Autoplay failed:", err);
      });
      window.removeEventListener('keydown', handleFirstKey);
    };

    window.addEventListener('keydown', handleFirstKey);

    return () => {
      window.removeEventListener('keydown', handleFirstKey);
      audio.pause();
    };
  }, [audio]);

  const toggleAudio = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div 
      style={{ position: 'fixed', top: 20, left: 20, cursor: 'pointer', zIndex: 1}}
      onClick={toggleAudio}
    >
      {isPlaying ? <FaVolumeUp size={30} color='white' /> : <FaVolumeMute size={30} color='black' />}
    </div>
  );
};

export default BackgroundAudio;
