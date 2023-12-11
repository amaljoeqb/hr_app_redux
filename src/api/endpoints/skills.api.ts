import { API } from "..";
import { SkillResponse } from "../models";
import { getSkillFromSkillGlobal } from "../services/converters";

export const getSkills = async () => {
  const response: SkillResponse = await API.get("/skills");
  const skills = response.data.map((skill) => getSkillFromSkillGlobal(skill));
  return skills;
};
