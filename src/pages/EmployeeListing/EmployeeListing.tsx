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
import { EmployeeCardsList } from "./components/EmployeeCardsList/EmployeeCardsList";
import { useEmployeeList } from "./hooks/useEmployeeList";

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
    employees,
    skills,
    total
  } = useEmployeeList();
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
          sort={sort}
        />
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
