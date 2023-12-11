import { EmployeeFormProps } from "../components/EmployeeForm";
import { useAppContext } from "../../../store/app.context";
import { getNextEmployeeId, isEmployeeEqual } from "../../../services/";
import { Employee } from "../../../models";
import { useApi } from "../../../hooks";
import { useMemo } from "react";

export default function useEmployeeForm({
  employee,
  skills,
  departments,
  isView,
  onEdit,
  onSave,
}: EmployeeFormProps) {
  const api = useApi();
  const appContext = useAppContext();
  const isInitialValid = employee !== undefined;
  const initialValues = useMemo(() => {
    const newEmployee: Employee = {
      employeeId: getNextEmployeeId(appContext.state.employees),
      name: "",
      email: "",
      designation: "",
      salary: 0,
      department: undefined,
      skills: [],
      dateOfBirth: "",
      joiningDate: "",
    };
    return employee || newEmployee;
  }, [employee, appContext.state.employees]);

  const isCreate = !employee;

  const departmentOptions = departments.map((department) => ({
    value: department,
    label: department.department,
  }));

  const skillsOptions = skills.map((skill) => ({
    value: skill,
    label: skill.skill,
  }));

  function onSubmit(values: Employee) {
    if (employee) {
      if (!isEmployeeEqual(employee, values)) {
        api.updateEmployee(values);
      }
    } else {
      api.createEmployee(values);
    }
    onSave();
  }

  function onClickEdit() {
    onEdit();
  }


  return {
    initialValues,
    onSubmit,
    onClickEdit,
    departmentOptions,
    skillsOptions,
    isInitialValid,
    isCreate
  };
}
