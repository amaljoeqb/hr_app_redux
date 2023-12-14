import spinner from "../../../assets/img/spinner.svg";
import { StyledLoader } from "./Loader.style";

export default function Loader(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <StyledLoader {...props}>
      <img id="loading-image" src={spinner} alt="Loading..." />
    </StyledLoader>
  );
}
