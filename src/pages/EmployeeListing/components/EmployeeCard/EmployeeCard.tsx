import { StyledEmployeeCard } from "./EmployeeCard.style";
import profileImg from "../../../../assets/img/profile.png";

export function EmployeeCard() {
  return (
    <StyledEmployeeCard>
      <img src={profileImg} alt="employee profile" />
      Employee Card
    </StyledEmployeeCard>
  );
}
