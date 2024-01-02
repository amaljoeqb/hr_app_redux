import { EmployeeFormProps } from "../components/EmployeeForm";
import { useAppContext } from "../../../store/app.context";
import { getNextEmployeeId, isEmployeeEqual } from "../../../services/";
import { Employee } from "../../../models";
import { useApi } from "../../../hooks";
import { useMemo, useState } from "react";
import { firebaseUploadImage } from "../../../services/";

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
      profilePic: "",
    };
    return employee || newEmployee;
  }, [employee, appContext.state.employees]);
  const [uploadImg, setUploadImg] = useState<string | File>("");
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
    const imgUrl = await firebaseUploadImage(uploadImg);
    const hardValue = structuredClone(values);
    hardValue.profilePic = imgUrl;
    if (employee) {
      if (!isEmployeeEqual(employee, hardValue)) {
        api.updateEmployee(hardValue);
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
    uploadImg,
  };
}
