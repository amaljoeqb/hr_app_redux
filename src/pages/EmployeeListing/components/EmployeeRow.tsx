import { Employee } from "../../../models";
import HighlightSpan from "../../../components/ui/HighlightSpan/HighlightSpan";
import { useNavigate } from "react-router-dom";
import EmployeeActionMenu from "./EmployeeActionMenu";
import SkillsCell from "./SkillsCell";
import { ColumnKey } from "../../../components/ui/Table/Table";

export interface EmployeeRowProps {
  employee: Employee;
  prevEmployee?: Partial<Employee>;
  searchTerm: string;
  cells: Set<ColumnKey<Employee>>;
  onShowModifiedField: (id: string, field: keyof Employee) => void;
}

export default function EmployeeRow({
  employee,
  prevEmployee,
  searchTerm,
  cells,
  onShowModifiedField,
}: EmployeeRowProps) {
  const navigate = useNavigate();
  const modifiedFields = new Set(Object.keys(prevEmployee ?? {}));

  return (
    <tr key={employee.employeeId} className="emp-row">
      {cells.has("employeeId") && (
        <td>
          <HighlightSpan
            text={employee.employeeId}
            searchTerm={searchTerm}
            modified={
              prevEmployee !== undefined &&
              prevEmployee.employeeId !== undefined
            }
            onModifiedAnimationEnd={() => {
              onShowModifiedField(employee.employeeId, "employeeId");
            }}
          />
        </td>
      )}
      {cells.has("name") && (
        <td>
          <div className="name-container">
            <div
              className="name"
              onClick={() => {
                navigate(`/employee/${employee.employeeId}`);
              }}
            >
              <HighlightSpan
                text={employee.name}
                searchTerm={searchTerm}
                modified={modifiedFields.has("name")}
                onModifiedAnimationEnd={() => {
                  onShowModifiedField(employee.employeeId, "name");
                }}
              />
              <span className="material-symbols-outlined"> visibility </span>
            </div>
            <HighlightSpan
              text={employee.email}
              searchTerm={searchTerm}
              modified={modifiedFields.has("email")}
              className="email"
              onModifiedAnimationEnd={() => {
                onShowModifiedField(employee.employeeId, "email");
              }}
            />
          </div>
        </td>
      )}
      {cells.has("designation") && (
        <td>
          <HighlightSpan
            text={employee.designation ?? "N/A"}
            searchTerm={searchTerm}
            modified={modifiedFields.has("designation")}
            onModifiedAnimationEnd={() => {
              onShowModifiedField(employee.employeeId, "designation");
            }}
          />
        </td>
      )}
      {cells.has("department") && (
        <td>
          <HighlightSpan
            text={employee.department?.department ?? ""}
            searchTerm={searchTerm}
            modified={modifiedFields.has("department")}
            onModifiedAnimationEnd={() => {
              onShowModifiedField(employee.employeeId, "department");
            }}
          />
        </td>
      )}
      {cells.has("skills") && <SkillsCell skills={employee.skills} />}
      {cells.has("actions") && (
        <td className="overflow">
          <EmployeeActionMenu
            onDelete={() => {
              navigate(`/?delete=${employee.employeeId}`);
            }}
            onEdit={() => {
              navigate(`/employee/${employee.employeeId}?edit=true`);
            }}
          />
        </td>
      )}
    </tr>
  );
}
