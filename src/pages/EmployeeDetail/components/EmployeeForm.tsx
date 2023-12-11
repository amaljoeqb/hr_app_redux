import TextInput from "../../../components/inputs/TextInput";
import { Department, Employee, Skill } from "../../../models";
import { Formik, Form, FormikProps } from "formik";
import { HoverButton, SelectInput, SubmitButton } from "../../../components";
import { employeeSchema } from "../../../config";
import useEmployeeForm from "../hooks/useEmployeeForm";
import { useEffect, useRef } from "react";
import { StyledEmployeeForm } from "./EmployeeForm.style";

export interface EmployeeFormProps {
  employee: Employee | undefined;
  skills: Skill[];
  departments: Department[];
  isView: boolean;
  className?: string;
  onEdit: () => void;
  onSave: () => void;
}

export default function EmployeeForm(props: EmployeeFormProps) {
  const {
    initialValues,
    onSubmit,
    skillsOptions,
    departmentOptions,
    isInitialValid,
    onClickEdit,
    isCreate,
  } = useEmployeeForm(props);

  const formik = useRef<FormikProps<Employee>>(null);

  useEffect(() => {
    if (formik.current) {
      formik.current.setValues(initialValues);
    }
  }, [props.isView, initialValues]);

  return (
    <StyledEmployeeForm className={props.className}>
      <Formik<Employee>
        initialValues={initialValues}
        validateOnMount={isInitialValid}
        onSubmit={onSubmit}
        validationSchema={employeeSchema}
        innerRef={formik}
      >
        <Form id="emp-form" noValidate>
          <div className="row">
            <TextInput
              label="Employee ID"
              name={isCreate ? "placeholder" : "employeeId"}
              type="number"
              disabled
            />
            <TextInput
              label="Name"
              name="name"
              placeholder={isCreate ? "" : "N/A"}
              required
            />
          </div>
          <div className="row">
            <TextInput
              label="Email"
              name="email"
              required
              placeholder={isCreate ? "" : "N/A"}
            />
            <TextInput
              type="number"
              label="Salary"
              name="salary"
              placeholder={isCreate ? "" : "N/A"}
            />
          </div>
          <div className="row">
            <TextInput
              label="Designation"
              placeholder={isCreate ? "" : "N/A"}
              name="designation"
              type="text"
            />
            <SelectInput<Department>
              label="Department"
              name="department"
              optionId="departmentId"
              isClearable
              placeholder={isCreate ? "Select Department" : "N/A"}
              options={departmentOptions}
              isDisabled={props.isView}
            />
          </div>
          <div className="row">
            <TextInput
              label="Date of birth"
              name="dateOfBirth"
              type="date"
              required
            />
            <TextInput
              label="Date of Joining"
              name="joiningDate"
              type="date"
              required
            />
          </div>
          <div className="row">
            <SelectInput<Skill>
              label="Skills"
              name="skills"
              optionId="skillId"
              isMulti
              placeholder={isCreate ? "Select Skills" : "N/A"}
              options={skillsOptions}
              isDisabled={props.isView}
            />
          </div>
          <div className="flip-container">
            <div className="front">
              <SubmitButton
                id="save-button"
                className="hover-btn primary submit"
                type="submit"
                value="Save"
              >
                Save
              </SubmitButton>
            </div>
            <div className="back">
              <HoverButton
                id="edit-button"
                className="hover-btn"
                type="button"
                onClick={onClickEdit}
              >
                Edit
              </HoverButton>
            </div>
          </div>
        </Form>
      </Formik>
    </StyledEmployeeForm>
  );
}
