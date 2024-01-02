import React, { useState } from "react";
import { StyledLogin } from "./LoginPage.styles";
import useAuth from "./hooks/useAuth";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = useAuth();

  const handleLogin = () => {
    logIn(username, password);
  };

  return (
    <StyledLogin>
      <h2>Login</h2>
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <section className="login-input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
            placeholder="Enter your username"
          />
        </section>
        <section className="login-input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder="Enter your password"
          />
        </section>
        <button type="submit" onClick={handleLogin} className="login-button">
          Login
        </button>
      </form>
    </StyledLogin>
  );
};

export default Login;
