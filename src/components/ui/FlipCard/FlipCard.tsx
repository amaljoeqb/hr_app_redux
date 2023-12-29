import { useEffect, useRef, useState } from "react";
import { StyledFlipCard } from "./FlipCard.style";

export function FlipCard({
  front,
  back,
  onClick,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  onClick?: () => void;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const translateX = window.innerWidth / 2 - (rect.left + rect.width / 2);
      const translateY = window.innerHeight / 2 - (rect.top + rect.height / 2);
      setTranslate({ x: translateX, y: translateY });
    }
  }, []);

  return (
    <StyledFlipCard
      x={translate.x}
      y={translate.y}
      ref={cardRef}
      className={`${isFlipped ? "flipped" : ""}`}
      onClick={() => setIsFlipped(!isFlipped)}
      onTransitionEnd={(e) => {
        if (isFlipped && e.propertyName === "opacity") {
          onClick?.();
        }
      }}
    >
      <div className="front">{front}</div>
      <div className="back">{back}</div>
    </StyledFlipCard>
  );
}
