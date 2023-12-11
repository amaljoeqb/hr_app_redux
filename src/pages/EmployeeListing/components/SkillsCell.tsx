import { useRef, useState } from "react";
import { Chip } from "../../../components";
import { Skill } from "../../../models";
import { skillsToString } from "../../../services";
import { Dropdown } from "../../../components/ui/Dropdown/Dropdown";

export default function SkillsCell({ skills }: { skills: Skill[] }) {
  const [isActive, setIsActive] = useState(false);
  const cellRef = useRef<HTMLTableCellElement>(null);

  function onMouseEnter() {
    if (cellRef.current === null) return;
    if (cellRef.current.clientWidth < cellRef.current.scrollWidth) {
      setIsActive(true);
    }
  }

  function onMouseLeave() {
    if (isActive) {
      setIsActive(false);
    }
  }

  return (
    <td
      className="skills-cell overflow"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="skill-chips" ref={cellRef}>
        {skills.map((skill) => (
          <Chip key={skill.skillId}>{skill.skill}</Chip>
        ))}
      </div>
      {isActive && (
        <Dropdown className="skills-tooltip">{skillsToString(skills)}</Dropdown>
      )}
    </td>
  );
}
