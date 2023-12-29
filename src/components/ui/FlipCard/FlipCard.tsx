import { useState } from "react";
import { StyledFlipCard } from "./FlipCard.style";

export function FlipCard({
  front,
  back,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <StyledFlipCard>
      <div
        className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="front">{front}</div>
        <div className="back">{back}</div>
      </div>
    </StyledFlipCard>
  );
}
