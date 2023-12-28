import { StyledEmployeeCard } from "./EmployeeCard.style";
import { Employee } from "../../../../models";
import defaultprofileImg from "../../../../assets/img/profile.png";
import EmployeeActionMenu from "../EmployeeActionMenu";
import { useNavigate } from "react-router-dom";

export function EmployeeCard({ employee }: { employee: Employee }) {
  const navigate = useNavigate();
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
            navigate(`/?delete=${employee.employeeId}`);
          }}
          onEdit={() => {
            navigate(`/employee/${employee.employeeId}?edit=true`);
          }}
        />
      </div>
      <img
        src={employee.profilePic ?? defaultprofileImg}
        alt="employee profile"
      />
      <div>
        <p className="view-emp-id">#{employee.employeeId}</p>
        <p className="view-emp-name">{employee.name}</p>
        <p className="view-emp-dept">{employee.department?.department} </p>
      </div>
    </StyledEmployeeCard>
  );
}
