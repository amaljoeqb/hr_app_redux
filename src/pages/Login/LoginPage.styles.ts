import styled from "styled-components";

export const StyledLogin = styled.div`
  display: "flex";
  flex-direction: "column";
  align-items: "center";
  justify-content: "center";
  height: "100vh";

  & .login-form {
    display: "flex";
    flex-direction: "column";
    width: "300px";
  }
  & .login-input-group {
    margin-bottom: "15px";
  }
  & .login-input {
    padding: "10px";
    font-size: "16px";
    width: "100%";
    box-sizing: "border-box";
  }
  & .login-button {
    padding: "10px";
    font-size: "16px";
    background-color: "#007bff";
    color: "#fff";
    border: "none";
    cursor: "pointer";
  }
`;
