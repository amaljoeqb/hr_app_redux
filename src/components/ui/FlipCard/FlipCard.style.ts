import styled from "styled-components";

export interface StyledFlipCardProps {
  x: number;
  y: number;
}

export const StyledFlipCard = styled.div<StyledFlipCardProps>`
  will-change: transform;
  position: relative;
  display: inline-block;
  transform-origin: top center;
  transform-style: preserve-3d;
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
  opacity: 0.99;

  .front,
  .back {
    backface-visibility: hidden;
    will-change: transform;
    transition: transform 0.5s ease-in-out;
  }

  .back {
    transform: rotateY(-180deg);
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &.flipped {
    .front {
      transform: rotateY(180deg);
    }

    .back {
      transform: rotateY(0deg);
    }

    opacity: 1;
    transform: translate(${({ x }) => x}px, ${({ y }) => y}px);
  }

  .back-content {
    & > div {
      min-height: 0;
    }
    header {
      display: none;
    }
    .popup {
      margin: 0;
    }

    .popup-content {
      margin: 0;
    }
  }
`;
