import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: white;
  z-index: 10;
  border-bottom: 1px solid var(--light-grey);

  & > div {
    margin-right: 30px;
  }
`;
