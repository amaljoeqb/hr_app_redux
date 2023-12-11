import styled from "styled-components";

export const StyledEmployeeCard = styled.div`
  box-shadow: var(--shadow);
  border-radius: 4px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > img {
    width: 100px;
    height: auto;
    object-fit: cover;
    display: block;
  }
`;
