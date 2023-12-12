import styled from "styled-components";

export const StyledEmployeeCard = styled.div`
  box-shadow: var(--shadow);
  border-radius: 4px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  gap: 20px;

  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out;
  }

  & > img {
    width: 130px;
    height: 130px;
    object-fit: cover;
    display: block;
    border-radius: 50%;
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .view-emp-name {
    font-weight: 500;
  }
  .view-emp-id {
    font-size: 12px;
    color: #808080;
  }
  .view-emp-dept {
    font-size: 12px;
  }
`;
