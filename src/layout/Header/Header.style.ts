import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--neutral-light);
  z-index: 2;
  border-bottom: 1px solid var(--light-grey);

  .logout-button {
    margin-right: 30px;
  }
`;
