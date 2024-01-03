import { EmployeeFormProps } from "../components/EmployeeForm";
import { isEmployeeEqual } from "../../../services/";
import { Employee } from "../../../models";
import { useMemo, useState } from "react";
import { firebaseUploadImage } from "../../../services/";
import { useAppDispatch } from "../../../store/store";
import {
  createEmployee,
  updateEmployee,
} from "../../../store/slices/employees.slice";

export default function useEmployeeForm({
  employee,
  skills,
  departments,
  isView,
  onEdit,
  onSave,
}: EmployeeFormProps) {
  const dispatch = useAppDispatch();
  const isInitialValid = employee !== undefined;
  const initialValues = useMemo(() => {
    const newEmployee: Employee = {
      employeeId: "",
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
  }, [employee]);
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
        dispatch(updateEmployee(hardValue));
      }
    } else {
      dispatch(createEmployee(values));
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
