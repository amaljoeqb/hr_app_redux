import { ButtonHTMLAttributes } from "react";
import { StyledHoverButton } from "./HoverButton.style";

interface IHoverProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  dotted?: boolean;
}

export default function HoverButton(props: IHoverProps) {
  return <StyledHoverButton {...props} />;
}
