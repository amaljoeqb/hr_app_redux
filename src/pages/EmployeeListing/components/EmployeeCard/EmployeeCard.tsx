import { StyledEmployeeCard } from "./EmployeeCard.style";
import { Employee } from "../../../../models";
import EmployeeActionMenu from "../EmployeeActionMenu";
import { useNavigate } from "react-router-dom";
import { openDeleteEmployeeDialog } from "../../../../store/slices/ui.slice";
import { useAppDispatch } from "../../../../store/store";
import { HighlightSpan } from "../../../../components";
import { getProfileImage } from "../../../../services";

export function EmployeeCard({
  employee,
  searchTerm,
}: {
  employee: Employee;
  searchTerm: string;
}) {
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
        src={getProfileImage({
          profileImage: employee.profilePic,
          name: employee.name,
        })}
        alt=""
      />
      <div>
        <p className="view-emp-id">#{employee.employeeId}</p>
        <p className="view-emp-name">
          <HighlightSpan
            text={employee.name}
            searchTerm={searchTerm}
            modified={false}
            onModifiedAnimationEnd={() => {}}
          />
        </p>
        <p className="view-emp-dept">{employee.department?.department} </p>
      </div>
    </StyledEmployeeCard>
  );
}
