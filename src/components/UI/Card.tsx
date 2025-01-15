
import { useRef } from 'react';

interface CardProps {
  staticImage: string;
  animatedGif: string;
  title: string;
}

const Card: React.FC<CardProps> = ({ staticImage, animatedGif, title }) => {
  const gifRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => {
    if (gifRef.current) {
      gifRef.current.src = animatedGif;
    }
  };

  const handleMouseLeave = () => {
    if (gifRef.current) {
      gifRef.current.src = staticImage;
    }
  };

  return (
    <div 
      className="card-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={gifRef}
        src={staticImage}
        alt={title}
        className="card-image"
      />
      <div className="card-content">
        <p>{title}</p>
      </div>
    </div>
  );
};

export default Card;