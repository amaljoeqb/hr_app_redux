import { Link } from "react-router-dom";
import logo from "../../assets/img/logo_black.svg";
import { StyledHeader } from "./Header.style";
import useAuth from "../../pages/Login/hooks/useAuth";
import { HoverButton } from "../../components";

export function Header() {
  const { logOut } = useAuth();
  return (
    <StyledHeader>
      <div className="container">
        <Link to="/" className="logo">
          <img src={logo} alt="logo" />
          <h1>
            <span className="bold">The Q</span> Company
          </h1>
        </Link>
        <div className="logout-button">
          <HoverButton onClick={logOut}>
            <span className="text">Logout </span>
            <span className="material-symbols-outlined">logout</span>
          </HoverButton>
        </div>
      </div>
    </StyledHeader>
  );
}
