import React from "react";
import { StyledChip } from "./Chip.style";

export default function Chip(props : React.HTMLProps<HTMLDivElement>) {
  return <StyledChip {...props}/>;
}
