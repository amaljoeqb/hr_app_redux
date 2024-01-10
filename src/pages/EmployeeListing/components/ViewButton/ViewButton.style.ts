import styled from "styled-components";

export const StyledViewButton = styled.button`
  border: none;
  outline: 1px solid var(--border-color);
  box-shadow: var(--light-shadow);
  font-weight: 400;
  font-size: 16px;
  display: flex;

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
    background-color: var(--neutral-light);
  }

  .half:hover {
    background-color: var(--accent-color);
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
