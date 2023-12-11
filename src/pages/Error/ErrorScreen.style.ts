import styled from "styled-components";

export const StyledErrorScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  & > * {
    margin: 8px;
  }

  h1 {
    font-size: 128px;
    font-weight: normal;
    color: var(--dark-grey);
  }

  h2 {
    font-size: 64px;
    font-weight: bold;
  }

  p {
    font-size: 24px;
  }
`;
