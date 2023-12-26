import { Link } from "react-router-dom";
import logo from "../../assets/img/logo_black.svg";
import { StyledHeader } from "./Header.style";
import useAuth from "../../pages/Login/hooks/useAuth";
import { HoverButton } from "../../components";

export function Header() {
  const { logOut } = useAuth();
  return (
    <StyledHeader>
      <Link to="/" className="logo">
        <img src={logo} alt="logo" />
        <h1>
          <span className="bold">The Q</span> Company
        </h1>
      </Link>
      <div>
        <HoverButton onClick={() => logOut()}>
          Logout <span className="material-symbols-outlined">logout</span>
        </HoverButton>
      </div>
    </StyledHeader>
  );
}
