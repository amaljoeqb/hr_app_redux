import * as API from "../../api";
import { Skill, Department, Action } from "../../models";
import { errorMessages } from "../../services";
import { AppThunk } from "../store";
import { showToast } from "./toasts.slice";

export interface StaticDataState {
  skills: Skill[];
  departments: Department[];
}

const SET_SKILLS = "SET_SKILLS";
const SET_DEPARTMENTS = "SET_DEPARTMENTS";

const staticDataReducer = (
  state: StaticDataState = {
    skills: [],
    departments: [],
  } as StaticDataState,
  action: Action
) => {
  switch (action.type) {
    case SET_SKILLS: {
      return { ...state, skills: action.payload };
    }
    case SET_DEPARTMENTS: {
      return { ...state, departments: action.payload };
    }
    default: {
      return state;
    }
  }
};

export const setSkills = (skills: Skill[]) => ({
  type: SET_SKILLS,
  payload: skills,
});

export const setDepartments = (departments: Department[]) => ({
  type: SET_DEPARTMENTS,
  payload: departments,
});

export const fetchSkills = (): AppThunk<Promise<Skill[] | undefined>> => {
  return async (dispatch) => {
    try {
      console.log("fetching skills");
      const skills = await API.getSkills();
      console.log("skills", skills);
      dispatch(setSkills(skills));
      return skills;
    } catch (error: any) {
      dispatch(
        showToast({
          message: errorMessages.getSkillsError,
          type: "error",
        })
      );
    }
  };
};

export const fetchDepartments = (): AppThunk<
  Promise<Department[] | undefined>
> => {
  return async (dispatch) => {
    try {
      const departments = await API.getDepartments();
      dispatch(setDepartments(departments));
      return departments;
    } catch (error: any) {
      dispatch(
        showToast({
          message: errorMessages.getDepartmentsError,
          type: "error",
        })
      );
    }
  };
};

export default staticDataReducer;
