import styled from "styled-components";

export const StyledEmployeeCard = styled.div`
  box-shadow: var(--shadow);
  border-radius: 4px;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  gap: 20px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  & > button {
    align-self: flex-end;
    border-radius: 8px;
  }

  & > button:hover {
    background-color: var(--grey-bg-color);
  }

  & > img {
    width: 130px;
    height: 130px;
    object-fit: cover;
    display: block;
    border-radius: 50%;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  }
  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }

  .edit-del-button {
    align-self: flex-end;
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

  .action-container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-direction: column;
    position: relative;
    margin: 0px 8px;
  }

  .action-btn {
    color: var(--text-color);
    padding: 4px;
    cursor: pointer;
    border-radius: 8px;
  }

  .action-btn span {
    font-size: 16px;
  }

  .action-btn:hover {
    background-color: var(--grey-bg-color);
  }

  .action-menu {
    background-color: white;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    display: none;
    border-radius: 6px;
    align-self: flex-end;
    box-shadow: var(--shadow);
    padding: 4px;
  }

  .action-container.active .action-menu {
    display: block;
  }

  .action-menu ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .action-menu li button {
    padding: 8px;
    display: flex;
    align-items: center;
    font-weight: 400;
    min-width: 120px;
    border-radius: 4px;
  }

  .action-menu li button:hover {
    background-color: var(--grey-bg-color);
  }
`;
