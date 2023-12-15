import { Skill, Department, Action } from "../../models";

export interface StaticDataState {
  skills: Skill[];
  departments: Department[];
}

export const staticDataReducer = (
  state: StaticDataState = {
    skills: [],
    departments: [],
  },
  action: Action
) => {
  switch (action.type) {
    case "SET_SKILLS": {
      return { ...state, skills: action.payload };
    }
    case "SET_DEPARTMENTS": {
      return { ...state, departments: action.payload };
    }
    default: {
      return state;
    }
  }
};
