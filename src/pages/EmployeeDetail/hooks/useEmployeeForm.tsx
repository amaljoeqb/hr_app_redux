import { EmployeeFormProps } from "../components/EmployeeForm";
import { useAppContext } from "../../../store/app.context";
import { getNextEmployeeId, isEmployeeEqual } from "../../../services/";
import { Employee } from "../../../models";
import { useApi } from "../../../hooks";
import { useMemo, useState } from "react";
import { firebaseUploadImage } from "../../../config/firebase.config";

export default function useEmployeeForm({
  employee,
  skills,
  departments,
  isView,
  onEdit,
  onSave,
}: EmployeeFormProps) {
  const api = useApi();
  const [uploadImg, setUploadImg] = useState<File | string>("");
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

  async function onSubmit(values: Employee) {
    let imgUrl = await firebaseUploadImage(uploadImg);
    values.profilePic = imgUrl;
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
    isCreate,
    setUploadImg,
  };
}
