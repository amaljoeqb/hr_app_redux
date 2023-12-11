import { Skill, Employee } from "../../../models";
import ClickAwayListener from "../../../components/eventListeners/ClickAwayListener";
import useSkillsFilter from "../hooks/useSkillsFilter";
import { HoverButton } from "../../../components";

export interface SkillsFilterProps {
  skills: Skill[];
  employees: Employee[];
  selectedSkills: string[];
  onChange?: (text: string[]) => void;
}

export default function SkillsFilter({
  skills,
  employees,
  selectedSkills,
  onChange,
}: SkillsFilterProps) {
  const {
    isActive,
    setIsActive,
    options,
    onClickSkillOption,
    setSearchTerm,
    onClickClearFilters,
  } = useSkillsFilter({ skills, employees, selectedSkills, onChange });

  return (
    <ClickAwayListener onClickOutside={() => setIsActive(false)}>
      <div
        id="skills-filter"
        className={`filter-btn-container ${isActive ? "active" : ""}`}
      >
        <HoverButton
          className="filter-btn dotted regular"
          onClick={() => {
            setIsActive(!isActive);
          }}
        >
          <span className="material-symbols-outlined"> tune </span>
          <p>Skills</p>
          <ul className="selected-items">
            {selectedSkills.map((skillId) => {
              const skill = skills.find((skill) => skill.skillId === skillId);
              return (
                <li
                  key={skillId}
                  className="selected-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClickSkillOption(skillId);
                  }}
                >
                  <p className="name">{skill?.skill}</p>
                  <span className="material-symbols-outlined close-icon">
                    close
                  </span>
                </li>
              );
            })}
          </ul>
        </HoverButton>
        <div className="filter-dropdown">
          <form className="filter-form">
            <span className="material-symbols-outlined search-icon">
              search
            </span>
            <input
              className="filter-search"
              type="text"
              id="skill-filter"
              name="skill-filter"
              placeholder="Search Skills"
              autoComplete="off"
              onInput={(e) => {
                setSearchTerm(e.currentTarget.value.toLowerCase());
              }}
            />
          </form>
          <hr />
          <ul className="filtered-items">
            {options.map((option) => {
              return (
                <li
                  key={option.skillId}
                  className="filtered-item"
                  onClick={() => onClickSkillOption(option.skillId)}
                >
                  <input
                    className="check"
                    type="checkbox"
                    checked={option.checked}
                    readOnly={true}
                  />
                  <p className="name">{option.skill}</p>
                  <p className="count">{option.count}</p>
                </li>
              );
            })}
          </ul>
          <hr />
          <button className="clear-filter" onClick={onClickClearFilters}>
            <p>Clear Filters</p>
          </button>
        </div>
      </div>
    </ClickAwayListener>
  );
}
