import styled from "styled-components";
import { StyledHoverButton } from "../../buttons/HoverButton.style";

export const StyledPaginationControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .pagination {
    margin: 12px 24px 24px 24px;
    display: flex;
    column-gap: 16px;
  }

  .page-numbers {
    align-items: center;
    display: flex;
    column-gap: 12px;
  }

  ${StyledHoverButton} {
    font-size: 12px;
    font-weight: 400;
  }

  .page-number {
    transition: transform 0.2s ease-in-out;
  }

  .page-number.active {
    font-weight: 600;
    color: var(--primary-color);
    transform: scale(1.2);
  }

  .pagination .hover-btn span {
    font-size: 12px;
  }

  @media screen and (max-width: 768px) {
    .page-last,
    .page-first {
      display: none;
    }
  }

  @media screen and (max-width: 480px) {
    .page-number:not(.active) {
      display: none;
    }

    .page-numbers {
      column-gap: 0;
    }
  }
`;
