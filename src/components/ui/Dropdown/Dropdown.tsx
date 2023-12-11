import React from "react";
import { StyledDropdown } from "./Dropdown.style";

export type DropdownPosition = "top" | "bottom";

export function Dropdown(props: React.HTMLAttributes<HTMLDivElement>) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState<DropdownPosition>("bottom");
  const [coordinates, setCoordinates] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const { current } = ref;
    if (current === null) return;
    const { x, y } = current.getBoundingClientRect();
    setCoordinates({ x, y });
  }, []);

  return (
    <StyledDropdown
      ref={ref}
      {...coordinates}
      className={`${position} dropdown`}
    >
      <div {...props} />
    </StyledDropdown>
  );
}
