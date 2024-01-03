import { useState } from "react";
import { ClickAwayListener } from "../../../components";
import { Dropdown } from "../../../components/ui/Dropdown/Dropdown";

export interface EmployeeActionMenuProps {
  onClick?: (e: MouseEvent) => void;
  onDelete: () => void;
  onEdit: () => void;
}

export default function EmployeeActionMenu(props: EmployeeActionMenuProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <ClickAwayListener
      onClickOutside={() => {
        setIsActive(false);
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation(); // this prevents the onclick function of the employee card and prevents showing employee details page when clicking on the button and on the select option div
        }}
        className={`action-container ${isActive ? "active" : ""}`}
      >
        <button
          className="action-btn"
          onClick={(e) => {
            setIsActive(!isActive);
          }}
        >
          <span className="material-symbols-outlined"> more_horiz </span>
        </button>
        {isActive && (
          <Dropdown className="action-menu">
            <ul>
              <li>
                <button className="edit-btn" onClick={props.onEdit}>
                  Edit
                </button>
              </li>
              <li>
                <button className="delete-btn" onClick={props.onDelete}>
                  Delete
                </button>
              </li>
            </ul>
          </Dropdown>
        )}
      </div>
    </ClickAwayListener>
  );
}
