import styled from "styled-components";

export const StyledEmployeeCardsList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 5rem;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
