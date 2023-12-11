import React from "react";
import { StyledTable } from "./Table.style";

export type ColumnKey<T> = keyof T | "actions";

export interface Column<T> {
  key: ColumnKey<T>;
  title: string;
  flex: number;
  sortable: boolean;
}

export interface TableProps<T> {
  columns: Column<T>[];
  sort?: {
    key: string;
    order: "asc" | "desc";
  };
  onClickSort?: (key: keyof T) => void;
}

export default function Table<T>({
  columns,
  sort,
  onClickSort,
  children,
}: React.PropsWithChildren<TableProps<T>>) {
  const totalFlex = columns.reduce((total, column) => {
    return total + column.flex;
  }, 0);

  function getTitleClassName(key: ColumnKey<T>, sortable: boolean) {
    if (!sortable) {
      return "column-title no-click";
    }
    if (sort?.key === key) {
      return `column-title ${sort.order}`;
    }
    return "column-title";
  }

  return (
    <StyledTable>
      <table>
        <colgroup>
          {columns.map((column) => {
            return (
              <col
                key={column.key.toString()}
                style={{ width: `${(column.flex / totalFlex) * 100}%` }}
              />
            );
          })}
        </colgroup>
        <thead>
          <tr className="header-row">
            {columns.map((column) => {
              return (
                <th key={column.key.toString()}>
                  <div className="header-container">
                    <h3
                      className={getTitleClassName(column.key, column.sortable)}
                      data-key={column.key}
                      onClick={() => {
                        if (
                          column.sortable &&
                          onClickSort &&
                          column.key !== "actions"
                        ) {
                          onClickSort(column.key);
                        }
                      }}
                    >
                      {column.title}
                      {column.sortable && (
                        <span className="sort-icon">
                          <span className="material-symbols-outlined up">
                            keyboard_arrow_up
                          </span>
                          <span className="material-symbols-outlined down">
                            keyboard_arrow_down
                          </span>
                        </span>
                      )}
                    </h3>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </StyledTable>
  );
}
