import styled from "styled-components";

export const StyledViewButton = styled.button`
  border: none;
  outline: 1px solid var(--border-color);
  box-shadow: var(--light-shadow);
  font-weight: 400;
  font-size: 16px;
  display: flex;
  column-gap: 2px;
  position: relative;
  background-color: var(--neutral-light);

  color: var(--text-color);
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  .half {
    border-radius: 6px;
    padding: 6px 6px;
    margin: 2px;
    z-index: 10;
  }

  .selected-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    background-color: var(--grey-bg-color);
    transition: transform 0.1s ease-in-out;
  }

  .selected-overlay.right {
    transform: translateX(100%);
  }

  .half:hover {
    background-color: var(--grey-bg-color);
  }

  span {
    font-size: 16px;
    color: var(--text-color);
  }

  .vertical-line {
    border-left: 1px solid var(--border-color);
    height: 20px;
  }

  @media screen and (max-width: 425px) {
    & > p {
      display: none;
    }
  }
`;
