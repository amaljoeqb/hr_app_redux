import { HoverButton } from "../..";
import { StyledPaginationControl } from "./PaginationControl.style";

export interface PaginationControlProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export default function PaginationControl({
  current,
  total,
  onChange,
}: PaginationControlProps) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <StyledPaginationControl>
      <div className="pagination">
        <HoverButton
          disabled={current === 1}
          className="regular page-first"
          onClick={() => {
            onChange(1);
          }}
        >
          <span className="material-symbols-outlined"> first_page </span>
        </HoverButton>
        <HoverButton
          disabled={current === 1}
          className="regular page-previous"
          onClick={() => {
            if (current > 1) {
              onChange(current - 1);
            }
          }}
        >
          <span className="material-symbols-outlined"> navigate_before </span>
        </HoverButton>
        <ul className="page-numbers">
          {pages.map((page) => (
            <li key={page}>
              <HoverButton
                id="page-1"
                data-num="1"
                className={`page-number regular ${
                  page === current ? "active" : ""
                }`}
                onClick={() => onChange(page)}
              >
                {page}
              </HoverButton>
            </li>
          ))}
        </ul>
        <HoverButton
          disabled={current === total}
          className="regular page-next"
          onClick={() => {
            if (current < total) {
              onChange(current + 1);
            }
          }}
        >
          <span className="material-symbols-outlined"> navigate_next </span>
        </HoverButton>
        <HoverButton
          disabled={current === total}
          className="hover-btn page-last"
          onClick={() => {
            onChange(total);
          }}
        >
          <span className="material-symbols-outlined"> last_page </span>
        </HoverButton>
      </div>
    </StyledPaginationControl>
  );
}
