import { Skill, Department } from "../../models";

export const staticDataReducer = (
  state: {
    skills: Skill[];
    departments: Department[];
  },
  action: {
    type: string;
    payload: any;
  }
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
