import * as Yup from "yup";

const employeeSchema = Yup.object({
  employeeId: Yup.number(),
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  salary: Yup.number()
    .typeError("Salary must be a number")
    .min(0, "Salary can't be negative"),
  designation: Yup.string(),
  department: Yup.object(),
  dateOfBirth: Yup.date().required("Required"),
  joiningDate: Yup.date().required("Required"),
  skills: Yup.array(),
});

export default employeeSchema;
