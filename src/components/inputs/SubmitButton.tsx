import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";
import { StyledSubmitButton } from "./SubmitButton.style";

interface ISubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export default function SubmitButton(props: ISubmitButtonProps) {
  return <StyledSubmitButton {...props} />;
}
