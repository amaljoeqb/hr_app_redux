import styled from "styled-components";

export const StyledFlipCard = styled.div`
  will-change: transform;
  position: relative;
  display: inline-block;
  transform-origin: top center;
  transform-style: preserve-3d;

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

  .flipped {
    .front {
      transform: rotateY(180deg);
    }

    .back {
      transform: rotateY(0deg);
    }
  }

  .back-content {
    background-color: red;
  }
`;
