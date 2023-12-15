import { Employee, Skill, Department } from "../models";
import { actions } from "./constants";

export const setEmployees = (employees: Employee[]) => ({
  type: actions.SET_EMPLOYEES,
  payload: employees,
});

export const setEmployee = (employee: Employee) => ({
  type: actions.SET_EMPLOYEE,
  payload: employee,
});

export const updateEmployeeId = (oldId: string, newId: string) => ({
  type: actions.UPDATE_EMPLOYEE_ID,
  payload: { oldId, newId },
});

export const deleteEmployee = (employeeId: string) => ({
  type: actions.DELETE_EMPLOYEE,
  payload: employeeId,
});

export const setSkills = (skills: Skill[]) => ({
  type: actions.SET_SKILLS,
  payload: skills,
});

export const setDepartments = (departments: Department[]) => ({
  type: actions.SET_DEPARTMENTS,
  payload: departments,
});

export const setPrevEmployee = (id: string, employee: Partial<Employee>) => ({
  type: actions.SET_PREV_EMPLOYEE,
  payload: { id, employee },
});

export const deletePrevEmployee = (
  id: string,
  employee: Partial<Employee>
) => ({
  type: actions.DELETE_PREV_EMPLOYEE,
  payload: { id, employee },
});
