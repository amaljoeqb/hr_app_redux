export const errorMessages = {
  getEmployeesError: "There was en error while fetching employees",
  getEmployeeError: (id: string) =>
    `There was en error while fetching employee (ID: ${id})`,
  createEmployeeError: (name: string) =>
    `There was en error while creating employee (${name})`,
  updateEmployeeError: (name: string) =>
    `There was en error while updating employee (${name})`,
  deleteEmployeeError: (name: string) =>
    `There was en error while deleting employee (${name})`,
  getSkillsError: "There was en error while fetching skills",
  getDepartmentsError: "There was en error while fetching departments",
  getRolesError: "There was en error while fetching roles",
};
