import { HoverButton, Loader } from "../../components";
import SearchInput from "./components/SearchInput";
import { useNavigate } from "react-router-dom";
import SkillsFilter from "./components/SkillsFilter";
import EmployeeDeletePopup from "./components/EmployeeDeletePopup";
import { StyledEmployeeListing } from "./EmployeeListing.style";
import { EmployeeCardsList } from "./components/EmployeeCardsList/EmployeeCardsList";
import { useEmployeeList } from "./hooks/useEmployeeList";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { closeDeleteEmployeeDialog } from "../../store/slices/ui.slice";
import SortButton from "./components/SortButton";
import { Employee } from "../../models";
import { sortAttributes } from "../../config/sortAttributes.config";

export function EmployeeListing() {
  const navigate = useNavigate();
  const {
    displayData,
    selectedSkills,
    setSelectedSkills,
    searchTerm,
    setSearchTerm,
    sort,
    setSort,
    skills,
    hasMore,
    loadingIconRef,
  } = useEmployeeList();
  const deleteEmployeeDialog = useAppSelector(
    (state) => state.ui?.deleteEmployeeDialog
  );
  const dispatch = useAppDispatch();
  return (
    <StyledEmployeeListing>
      <div className="card">
        <div className="next-section">
          <h1>Employees</h1>
          <HoverButton
            onClick={() => {
              navigate("/employee/?edit=true");
            }}
          >
            <span className="material-symbols-outlined"> add_circle </span>
            <p>Create</p>
          </HoverButton>
        </div>
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
            <SortButton<Employee>
              sort={sort}
              columns={sortAttributes}
              onChange={(sort) => {
                setSort(sort);
              }}
            />
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
      </div>
      {deleteEmployeeDialog.isOpen && (
        <EmployeeDeletePopup
          employee={deleteEmployeeDialog.employee}
          onClose={() => {
            dispatch(closeDeleteEmployeeDialog());
          }}
        />
      )}
    </StyledEmployeeListing>
  );
}
