import { StyledEmployeeCard } from "./EmployeeCard.style";
import { Employee } from "../../../../models";
import profileImg from "../../../../assets/img/person1.jpeg";

export function EmployeeCard({ employee }: { employee: Employee }) {
  return (
    <StyledEmployeeCard>
      <img src={profileImg} alt="employee profile" />
      <div>
        <p className="view-emp-id">#{employee.employeeId}</p>
        <p className="view-emp-name">{employee.name}</p>
        <p className="view-emp-dept">{employee.department?.department} </p>
        {/* <p>
          Designation : {employee.designation ? employee.designation : "N/A"}
        </p> */}
      </div>
    </StyledEmployeeCard>
  );
}
