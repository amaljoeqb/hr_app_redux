import styled from "styled-components";

export const StyledLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 200;

  &.listing {
    margin-top: 16px;
  }

  &.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }

  #loading-image {
    width: 48px;
    margin: 16px;
  }
`;
