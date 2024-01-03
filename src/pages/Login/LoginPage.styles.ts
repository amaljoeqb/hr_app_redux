import styled from "styled-components";

export const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  & .login-form {
    display: flex;
    flex-direction: column;
    width: 300px;
  }
  & .login-input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 15px;
  }
  & .login-input {
    padding: 10px;
    font-size: 16px;
    width: 100%;
    box-sizing: border-box;
  }
  & .login-button {
    padding: 10px;
    font-size: 16px;
    background-color: var(--neutral-light);
    color: var(--neutral-dark);
    border: 1px solid var(--neutral-dark);
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  & .login-button:hover {
    color: var(--neutral-light);
    background-color: var(--neutral-dark);
    border: 1px solid var(--neutral-light);
    transform: scale(1.08);
  }
`;
