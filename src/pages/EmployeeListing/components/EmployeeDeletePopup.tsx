import { HoverButton, Popup } from "../../../components";
import { Employee } from "../../../models";

export interface EmployeeDeletePopupProps {
  employee: Employee;
  onClose: () => void;
}

export default function EmployeeDeletePopup({
  employee,
  onClose,
}: EmployeeDeletePopupProps) {

  function onDelete() {
    onClose();
  }

  return (
    <Popup
      content={
        <>
          Are you sure you want to delete employee <b>{employee?.name}</b>?
        </>
      }
      title="Delete Employee"
      actions={
        <>
          <HoverButton className="hover-btn primary confirm" onClick={onDelete}>
            Yes
          </HoverButton>
          <HoverButton className="hover-btn cancel" onClick={onClose}>
            No
          </HoverButton>
        </>
      }
      onClose={onClose}
    />
  );
}
