import { useAppContext } from "../store/app.context";
import * as API from "../api";
import { Employee, FetchDataProps } from "../models";
import { errorMessages, getEmployeeDiff } from "../services/";
import { successMessages } from "../services/successMessages";
import { useEffect } from "react";

export default function useApi() {
  const appContext = useAppContext();

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
    getSkills,
    getDepartments,
    getRoles,
  };
}
