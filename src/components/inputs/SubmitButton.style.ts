import styled from "styled-components";
import { StyledHoverButton } from "../buttons/HoverButton.style";

export const StyledSubmitButton = styled(StyledHoverButton).attrs({
  type: "submit",
})`
  background-color: var(--primary-color);
  color: white;

  &:hover {
    background-color: var(--primary-overlay);
  }
`;
