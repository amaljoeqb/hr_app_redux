import { HoverButton, Loader } from "../../components";
import SearchInput from "./components/SearchInput";
import { useNavigate } from "react-router-dom";
import SkillsFilter from "./components/SkillsFilter";
import EmployeeDeletePopup from "./components/EmployeeDeletePopup";
import { StyledEmployeeListing } from "./EmployeeListing.style";
import { EmployeeCardsList } from "./components/EmployeeCardsList/EmployeeCardsList";
import { useEmployeeList } from "./hooks/useEmployeeList";
import { useAppSelector } from "../../store/store";

export function EmployeeListing() {
  const navigate = useNavigate();
  const {
    displayData,
    selectedSkills,
    setSelectedSkills,
    searchTerm,
    setSearchTerm,
    sort,
    skills,
    hasMore,
    loadingIconRef,
  } = useEmployeeList();
  const deleteEmployeeDialog = useAppSelector(
    (state) => state.ui?.deleteEmployeeDialog
  );
  return (
    <StyledEmployeeListing>
      <main className="card">
        <h1>Employees</h1>
        <div className="emp-listing-header">
          <div className="start-section">
            <SearchInput
              onChange={(text) => {
                setSearchTerm(text);
              }}
              value={searchTerm}
            />
          </div>
          <div className="next-section">
            <div className="filters-section">
              <SkillsFilter
                skills={skills}
                employees={displayData}
                selectedSkills={selectedSkills}
                onChange={(skills) => {
                  setSelectedSkills(skills);
                }}
              />
            </div>
            <HoverButton
              onClick={() => {
                navigate("/employee/?edit=true");
              }}
            >
              <span className="material-symbols-outlined"> add_circle </span>
              <p>Create</p>
            </HoverButton>
          </div>
        </div>
        <EmployeeCardsList
          employees={displayData}
          searchTerm={searchTerm}
          sort={{
            key: sort.columnId,
            order: sort.order,
          }}
        />
        {hasMore && (
          <Loader
            key={displayData.length}
            innerRef={loadingIconRef}
            className="listing"
          />
        )}
      </main>
      {deleteEmployeeDialog.isOpen && (
        <EmployeeDeletePopup
          employee={deleteEmployeeDialog.employee}
          onClose={() => {
            navigate(-1);
          }}
        />
      )}
    </StyledEmployeeListing>
  );
}
