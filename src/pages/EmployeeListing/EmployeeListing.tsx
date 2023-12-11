import EmployeeTable from "./components/EmployeeTable";
import { HoverButton } from "../../components";
import { PaginationControl } from "../../components/";
import SearchInput from "./components/SearchInput";
import { useAppContext } from "../../store/app.context";
import { useNavigate } from "react-router-dom";
import useEmployeeTable from "./hooks/useEmployeeTable";
import SkillsFilter from "./components/SkillsFilter";
import EmployeeDeletePopup from "./components/EmployeeDeletePopup";
import { useQuery } from "../../hooks";
import { Footer, Header } from "../../layout";
import { StyledEmployeeListing } from "./EmployeeListing.style";
import { columnIds } from "../../config";

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
    page,
    setPage,
    filteredData,
    employees,
    skills,
    totalPages,
    prevEmployees,
    onShowModifiedField,
    columns,
    setColumns,
  } = useEmployeeTable();
  const urlParams = useQuery();
  const deleteEmployeeId = urlParams.get("delete");

  return (
    <StyledEmployeeListing>
      <Header />
      <main className="card">
        <h1>Employees</h1>
        <div className="emp-listing-header">
          <div className="start-section">
            <SearchInput
              onChange={(text) => {
                setSearchTerm(text);
              }}
            />
          </div>
          <div className="next-section">
            <div className="filters-section">
              <SkillsFilter
                skills={skills}
                employees={employees}
                selectedSkills={selectedSkills}
                onChange={(skills) => {
                  setSelectedSkills(skills);
                  setPage(1);
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

        <EmployeeTable
          employees={displayData}
          prevEmployees={prevEmployees}
          searchTerm={searchTerm}
          sort={sort}
          onChangeSort={(sort) => {
            setSort(sort);
          }}
          columns={columns}
          setColumns={setColumns}
          onShowModifiedField={onShowModifiedField}
        />
        {totalPages > 1 && (
          <PaginationControl
            current={page}
            total={totalPages}
            onChange={(page) => {
              setPage(page);
            }}
          />
        )}
      </main>
      {deleteEmployeeId && (
        <EmployeeDeletePopup
          employeeId={deleteEmployeeId}
          onClose={() => {
            navigate(-1);
          }}
        />
      )}
      <Footer />
    </StyledEmployeeListing>
  );
}
