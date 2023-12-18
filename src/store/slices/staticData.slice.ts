import { Skill, Department, Action } from "../../models";

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

export default staticDataReducer;
