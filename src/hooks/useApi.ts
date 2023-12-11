import { useAppContext } from "../store/app.context";
import * as API from "../api";
import { Employee } from "../models";
import { errorMessages, getEmployeeDiff } from "../services/";
import { successMessages } from "../services/successMessages";
import { useEffect } from "react";

export default function useApi() {
  const appContext = useAppContext();

  function setPrevEmployee(id: string, employee: Partial<Employee>) {
    const payload = { id: id, employee: employee };
    appContext.dispatch({
      type: "SET_PREV_EMPLOYEE",
      payload: payload,
    });
    setTimeout(() => {
      appContext.dispatch({
        type: "DELETE_PREV_EMPLOYEE",
        payload: payload,
      });
    }, 3000);
  }

  async function getEmployees() {
    try {
      const employees = await API.getEmployees();
      appContext.dispatch({ type: "SET_EMPLOYEES", payload: employees });
      return employees;
    } catch (error: any) {
      appContext.showToast({
        message: errorMessages.getEmployeesError,
        type: "error",
      });
    }
  }

  async function getEmployee(id: string) {
    try {
      const employee = await API.getEmployee(id);
      appContext.dispatch({ type: "SET_EMPLOYEE", payload: employee });
      return employee;
    } catch (error: any) {
      appContext.showToast({
        message: errorMessages.getEmployeeError(id),
        type: "error",
      });
      return null;
    }
  }

  async function createEmployee(employee: Employee) {
    try {
      appContext.dispatch({ type: "ADD_EMPLOYEE", payload: employee });
      setPrevEmployee(employee.employeeId, {});
      const response = await API.createEmployee(employee);
      const receivedId = response.id.toString();
      if (receivedId !== employee.employeeId) {
        appContext.dispatch({
          type: "UPDATE_EMPLOYEE_ID",
          payload: { oldId: employee.employeeId, newId: receivedId },
        });
      }
      appContext.showToast({
        message: successMessages.createEmployeeSuccess(employee.name),
        type: "success",
      });
      setPrevEmployee(receivedId, { employeeId: employee.employeeId });
    } catch (error: any) {
      appContext.showToast({
        message: errorMessages.createEmployeeError(employee.name),
        type: "error",
      });
      appContext.dispatch({
        type: "DELETE_EMPLOYEE",
        payload: employee.employeeId,
      });
    }
  }

  async function updateEmployee(employee: Employee) {
    const currentEmployee = appContext.state.employees.find(
      (e) => e.employeeId === employee.employeeId
    );
    try {
      setPrevEmployee(
        employee.employeeId,
        getEmployeeDiff(currentEmployee, employee)
      );
      appContext.dispatch({ type: "UPDATE_EMPLOYEE", payload: employee });
      await API.updateEmployee(employee);
      appContext.showToast({
        message: successMessages.updateEmployeeSuccess(employee.name),
        type: "success",
      });
    } catch (error: any) {
      appContext.showToast({
        message: errorMessages.updateEmployeeError(
          currentEmployee?.name ?? employee.employeeId
        ),
        type: "error",
      });
      appContext.dispatch({
        type: "UPDATE_EMPLOYEE",
        payload: currentEmployee,
      });
    }
  }

  async function deleteEmployee(id: string) {
    const currentEmployee = appContext.state.employees.find(
      (e) => e.employeeId === id
    );
    try {
      appContext.dispatch({ type: "DELETE_EMPLOYEE", payload: id });
      await API.deleteEmployee(id);
      appContext.showToast({
        message: successMessages.deleteEmployeeSuccess(
          currentEmployee?.name ?? id
        ),
        type: "success",
      });
    } catch (error: any) {
      appContext.showToast({
        message: errorMessages.deleteEmployeeError(currentEmployee?.name ?? id),
        type: "error",
      });
      appContext.dispatch({
        type: "ADD_EMPLOYEE",
        payload: currentEmployee,
      });
    }
  }

  async function getSkills() {
    try {
      const skills = await API.getSkills();
      appContext.dispatch({ type: "SET_SKILLS", payload: skills });
      return skills;
    } catch (error: any) {
      appContext.showToast({
        message: errorMessages.getSkillsError,
        type: "error",
      });
    }
  }

  async function getDepartments() {
    try {
      const departments = await API.getDepartments();
      appContext.dispatch({ type: "SET_DEPARTMENTS", payload: departments });
    } catch (error: any) {
      appContext.showToast({
        message: errorMessages.getDepartmentsError,
        type: "error",
      });
    }
  }

  async function getRoles() {
    try {
      return await API.getRoles();
    } catch (error: any) {
      appContext.showToast({
        message: errorMessages.getRolesError,
        type: "error",
      });
      return [];
    }
  }

  return {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getSkills,
    getDepartments,
    getRoles,
  };
}
