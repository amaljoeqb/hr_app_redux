import { StyledEmployeeCard } from "./EmployeeCard.style";
import { Employee } from "../../../../models";
import defaultprofileImg from "../../../../assets/img/profile.png";
import EmployeeActionMenu from "../EmployeeActionMenu";
import { useNavigate } from "react-router-dom";
import { openDeleteEmployeeDialog } from "../../../../store/slices/ui.slice";
import { useAppDispatch } from "../../../../store/store";

export function EmployeeCard({ employee }: { employee: Employee }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <StyledEmployeeCard
      onClick={() => {
        navigate(`/employee/${employee.employeeId}`);
      }}
      tabIndex={0}
    >
      <div className="edit-del-button">
        <EmployeeActionMenu
          onDelete={() => {
            dispatch(openDeleteEmployeeDialog(employee));
          }}
          onEdit={() => {
            navigate(`/employee/${employee.employeeId}?edit=true`);
          }}
        />
      </div>
      <img
        src={
          employee.profilePic && employee.profilePic !== ""
            ? employee.profilePic
            : defaultprofileImg
        }
        alt=""
      />
      <div>
        <p className="view-emp-id">#{employee.employeeId}</p>
        <p className="view-emp-name">{employee.name}</p>
        <p className="view-emp-dept">{employee.department?.department} </p>
      </div>
    </StyledEmployeeCard>
  );
}
