import { StyledEmployeeCard } from "./EmployeeCard.style";
import { Employee } from "../../../../models";
import profileImg from "../../../../assets/img/profile.png";
import EmployeeActionMenu from "../EmployeeActionMenu";
import { useNavigate } from "react-router-dom";
import { FlipCard } from "../../../../components/ui/FlipCard/FlipCard";
import EmployeeDetail from "../../../EmployeeDetail/EmployeeDetail";
import EmployeeForm from "../../../EmployeeDetail/components/EmployeeForm";

export function EmployeeCard({ employee }: { employee: Employee }) {
  const navigate = useNavigate();
  const moreDetailsObj = employee.moreDetails
    ? JSON.parse(employee.moreDetails)
    : "";
  const profileUrl = moreDetailsObj.photoId
    ? moreDetailsObj.photoId
    : profileImg;
  return (
    <FlipCard
      front={
        <StyledEmployeeCard
          onClick={() => {
            //navigate(`/employee/${employee.employeeId}`);
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
          <img src={profileUrl} alt="employee profile" />
          <div>
            <p className="view-emp-id">#{employee.employeeId}</p>
            <p className="view-emp-name">{employee.name}</p>
            <p className="view-emp-dept">{employee.department?.department} </p>
          </div>
        </StyledEmployeeCard>
      }
      back={
        <div className="back-content">
          <EmployeeDetail />
        </div>
      }
    />
  );
}
