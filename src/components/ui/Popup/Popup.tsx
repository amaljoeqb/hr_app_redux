import React from "react";
import ClickAwayListener from "../../eventListeners/ClickAwayListener";

export interface PopupPropsType {
  title: string;
  content: React.ReactNode;
  onClose: () => void;
  actions?: React.ReactNode;
}

export default function Popup(props: PopupPropsType) {
  return (
    <div className="popup confirmation-popup show-popup">
      <ClickAwayListener onClickOutside={props.onClose}>
        <section className="popup-content">
          <div className="popup-header">
            <h2>{props.title}</h2>
            <span
              className="material-symbols-outlined close-popup"
              onClick={props.onClose}
            >
              close
            </span>
          </div>
          <div className="confirmation-content">
            <p className="confirmation-message">{props.content}</p>
            {props.actions && (
              <div className="confirmation-btns">{props.actions}</div>
            )}
          </div>
        </section>
      </ClickAwayListener>
    </div>
  );
}
