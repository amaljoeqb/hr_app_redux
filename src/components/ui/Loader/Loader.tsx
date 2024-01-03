import spinner from "../../../assets/img/spinner.svg";
import { StyledLoader } from "./Loader.style";

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  innerRef?: React.Ref<HTMLDivElement>;
}

export default function Loader({ innerRef, ...props }: LoaderProps) {
  return (
    <StyledLoader {...props} ref={innerRef}>
      <img id="loading-image" src={`${spinner}`} alt="Loading..." />
    </StyledLoader>
  );
}
