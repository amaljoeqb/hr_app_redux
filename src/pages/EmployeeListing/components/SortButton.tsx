import ClickAwayListener from "../../../components/eventListeners/ClickAwayListener";
import { HoverButton } from "../../../components";
import { useState } from "react";

export type SortDirection = "asc" | "desc";

export interface SortAttribute<T> {
  id: keyof T;
  label: string;
}

export interface Sort<T> {
  columnId: keyof T;
  order: SortDirection;
}

export interface SortButtonProps<T> {
  sort: Sort<T>;
  columns: SortAttribute<T>[];
  onChange: (sort: Sort<T>) => void;
}

export default function SortButton<T>({
  sort,
  columns: sortAttributes,
  onChange,
}: SortButtonProps<T>) {
  const [isActive, setIsActive] = useState(false);

  const onClickAttribute = (option: keyof T) => {
    onChange({
      columnId: option,
      order: sort.order,
    });
  };

  const onClickDirection = (direction: SortDirection) => {
    onChange({
      columnId: sort.columnId,
      order: direction,
    });
  };

  return (
    <ClickAwayListener onClickOutside={() => setIsActive(false)}>
      <div
        id="sort-btn"
        className={`filter-btn-container ${isActive ? "active" : ""}`}
      >
        <HoverButton
          className="filter-btn dotted regular"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <span className="material-symbols-outlined"> sort </span>
          <p>Sort</p>
        </HoverButton>
        <div className="filter-dropdown">
          <ul className="filtered-items">
            {sortAttributes.map((attr) => {
              return (
                <li
                  key={attr.toString()}
                  className="filtered-item"
                  onClick={() => onClickAttribute(attr.id)}
                >
                  <input
                    className="check"
                    type="checkbox"
                    checked={attr.id === sort.columnId}
                    readOnly={true}
                  />
                  <p className="name">{attr.label}</p>
                </li>
              );
            })}
          </ul>
          <hr />
          <ul className="filtered-items">
            <li
              key={"asc"}
              className="filtered-item"
              onClick={() => onClickDirection("asc")}
            >
              <input
                className="check"
                type="checkbox"
                checked={sort.order === "asc"}
                readOnly={true}
              />
              <p className="name">Ascending</p>
            </li>
            <li
              key={"desc"}
              className="filtered-item"
              onClick={() => onClickDirection("desc")}
            >
              <input
                className="check"
                type="checkbox"
                checked={sort.order === "desc"}
                readOnly={true}
              />
              <p className="name">Descending</p>
            </li>
          </ul>
          <hr />
        </div>
      </div>
    </ClickAwayListener>
  );
}
