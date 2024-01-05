import { StyledEmployeeCard } from "./EmployeeCard.style";
import { Employee } from "../../../../models";
import defaultprofileImg from "../../../../assets/img/profile.png";
import EmployeeActionMenu from "../EmployeeActionMenu";
import { useNavigate } from "react-router-dom";
import { openDeleteEmployeeDialog } from "../../../../store/slices/ui.slice";
import { useAppDispatch } from "../../../../store/store";
import { placeholderImages } from "../../../../data/placeholders";
import { guessGender, hashStringToNumber } from "../../../../services";
import { Gender } from "../../../../models/gender";

export function EmployeeCard({ employee }: { employee: Employee }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const placeholders =
    guessGender(employee.name) === Gender.Male
      ? placeholderImages.male
      : placeholderImages.female;

  const placeholderIndex = hashStringToNumber(
    employee.name,
    placeholders.length
  );
  if (employee.employeeId === "93") {
    console.log(placeholderIndex);
  }

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
            : placeholders[placeholderIndex]
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
