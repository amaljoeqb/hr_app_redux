import { useState } from "react";
import { ClickAwayListener } from "../../../components";
import { Dropdown } from "../../../components/ui/Dropdown/Dropdown";

export interface EmployeeActionMenuProps {
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
      <div className={`action-container ${isActive ? "active" : ""}`}>
        <button
          className="action-btn"
          onClick={() => {
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
