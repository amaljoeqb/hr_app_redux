import { createRef, useEffect } from "react";
import { StyledHighlightSpan } from "./HighlightSpan.style";

export interface HighlightSpanProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  text: string | number;
  searchTerm: string;
  modified: boolean;
  onModifiedAnimationEnd: () => void;
}

export default function HighlightSpan({
  text,
  searchTerm,
  modified,
  onModifiedAnimationEnd,
  ...props
}: HighlightSpanProps) {
  const ref = createRef<HTMLSpanElement>();
  const textString = text.toString();
  const lowerCaseText = textString.toString().toLowerCase();

  function getHighlightedElement() {
    const startIndex = lowerCaseText.toString().indexOf(searchTerm);
    const endIndex = startIndex + searchTerm.length;

    return (
      <>
        {textString.slice(0, startIndex)}
        <span className="highlight">
          {textString.slice(startIndex, endIndex)}
        </span>
        {textString.slice(endIndex)}
      </>
    );
  }

  function getClassName() {
    let className = props.className ?? "";
    if (modified) {
      className += " modified";
    }
    return className;
  }

  return (
    <StyledHighlightSpan
      ref={ref}
      {...props}
      className={getClassName()}
      onAnimationEnd={onModifiedAnimationEnd}
    >
      {!searchTerm || !lowerCaseText.includes(searchTerm)
        ? text
        : getHighlightedElement()}
    </StyledHighlightSpan>
  );
}
