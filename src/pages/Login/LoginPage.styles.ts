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
    background-color: #fff;
    color: #000;
    border: 1px solid #000;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  & .login-button:hover {
    color: #fff;
    background-color: #000;
    border: 1px solid #fff;
    transform: scale(1.08);
  }
`;
