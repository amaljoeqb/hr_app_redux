import styled from "styled-components";

export const StyledDropdown = styled.div<{ x: number; y: number }>`
  position: absolute;
  top: 100%;
  z-index: 100;

  &.top {
    top: auto;
    bottom: 100%;
  }

  .dropdown {
    position: fixed;
    top: ${(props) => props.y}px;
    left: ${(props) => props.x}px;
    display: block;
  }
`;
