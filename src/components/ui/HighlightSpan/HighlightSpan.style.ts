import styled from "styled-components";

export const StyledHighlightSpan = styled.span`
  transition: all 0.1s ease-in-out;

  &.modified {
    animation: modified-anim 1s ease-in-out;

    @keyframes modified-anim {
      0% {
        color: var(--text-color);
        background-color: transparent;
      }
      50% {
        color: var(--modified-color);
        background-color: var(--modified-bg-color);
      }
      100% {
        color: var(--text-color);
        background-color: transparent;
      }
    }
  }

  &.added {
    animation: added-anim 1s ease-in-out;

    @keyframes added-anim {
      0% {
        color: var(--text-color);
      }
      50% {
        color: var(--added-color);
      }
      100% {
        color: var(--text-color);
      }
    }
  }

  .highlight {
    background-color: var(--highlight-color);
  }
`;
