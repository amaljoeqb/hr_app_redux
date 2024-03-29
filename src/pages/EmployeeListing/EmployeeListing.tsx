import { HoverButton, Loader, PaginationControl } from "../../components";
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
import EmployeeTable from "./components/EmployeeTable";
import { ViewButton } from "./components/ViewButton/ViewButton";

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
    pageNumber,
    setPageNumber,
    totalPageCount,
    prevEmployees, 
    onShowModifiedField,
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
          <ViewButton
            onChangeView={(view) => {
              if (view === "grid") {
                setPageNumber(null);
              } else if (view === "table") {
                setPageNumber(1);
              }
            }}
            view={pageNumber ? "table" : "grid"}
          />
        </div>
        {pageNumber !== null ? (
          <>
            <EmployeeTable
              employees={displayData}
              searchTerm={searchTerm}
              sort={{
                key: sort.columnId,
                order: sort.order,
              }}
              onChangeSort={(sort) => {
                setSort({
                  columnId: sort.key,
                  order: sort.order,
                });
              }}
              prevEmployees={prevEmployees}
              onShowModifiedField={onShowModifiedField}
            />
            <PaginationControl
              current={pageNumber}
              total={totalPageCount}
              onChange={(page) => {
                setPageNumber(page);
              }}
            />
          </>
        ) : (
          <>
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
          </>
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
