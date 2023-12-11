import { useEffect, useState } from "react";
import { Skill } from "../../../models";
import { SkillsFilterProps } from "../components/SkillsFilter";

export interface SkillOption extends Skill {
  count: number;
  checked: boolean;
}

export default function useSkillsFilter({
  skills,
  employees,
  selectedSkills,
  onChange,
}: SkillsFilterProps) {
  const [isActive, setIsActive] = useState(false);
  const [options, setOptions] = useState<SkillOption[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  function onClickSkillOption(skillId: string) {
    if (selectedSkills.includes(skillId)) {
      onChange?.(selectedSkills.filter((id) => id !== skillId));
    } else {
      onChange?.([...selectedSkills, skillId]);
    }
  }

  function onClickClearFilters() {
    setIsActive(false);
    onChange?.([]);
  }

  useEffect(() => {
    const options = skills
      .filter((skill) => {
        return skill.skill.toLowerCase().includes(searchTerm);
      })
      .map((skill) => {
        return {
          skillId: skill.skillId,
          skill: skill.skill,
          count: employees.filter((employee) => {
            return employee.skills.find((skillItem) => {
              return skillItem.skillId === skill.skillId;
            });
          }).length,
          checked: selectedSkills.includes(skill.skillId),
        };
      })
      .filter((option) => option.count > 0)
      .sort((a, b) => b.count - a.count);
    setOptions(options);
  }, [employees, skills, selectedSkills, searchTerm]);

  return {
    isActive,
    setIsActive,
    options,
    searchTerm,
    setSearchTerm,
    onClickSkillOption,
    onClickClearFilters,
  };
}
