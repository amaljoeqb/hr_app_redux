import { HoverButton, Popup } from "../../../components";
import { useApi } from "../../../hooks";
import { useAppContext } from "../../../store/app.context";

export interface EmployeeDeletePopupProps {
  employeeId: string;
  onClose: () => void;
}

export default function EmployeeDeletePopup({
  employeeId,
  onClose,
}: EmployeeDeletePopupProps) {
  const api = useApi();
  const appContext = useAppContext();

  const employee = appContext.state.employees.find(
    (employee) => employee.employeeId === employeeId
  );

  function onDelete() {
    api.deleteEmployee(employeeId);
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
