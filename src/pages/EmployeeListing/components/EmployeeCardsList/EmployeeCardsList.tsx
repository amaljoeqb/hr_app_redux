import { ColumnKey } from "../../../../components/ui/Table/Table";
import { Employee } from "../../../../models";
import { EmployeeCard } from "../EmployeeCard/EmployeeCard";
import { StyledEmployeeCardsList } from "./EmployeeCardsList.style";

export interface EmployeeCardsListProps {
  employees: Employee[];
  searchTerm: string;
  sort: {
    key: keyof Employee;
    order: "asc" | "desc";
  };
}

export function EmployeeCardsList(props: EmployeeCardsListProps) {
  return (
    <StyledEmployeeCardsList>
      {props.employees.map((employee) => {
        return <EmployeeCard employee={employee} />;
      })}
    </StyledEmployeeCardsList>
  );
}
