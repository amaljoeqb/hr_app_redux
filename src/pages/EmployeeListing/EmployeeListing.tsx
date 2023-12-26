import EmployeeTable from "./components/EmployeeTable";
import { HoverButton, Loader } from "../../components";
import { PaginationControl } from "../../components/";
import SearchInput from "./components/SearchInput";
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
import { useState } from "react";
import { Employee } from "../../models";
import { useAppSelector } from "../../store/store";
import useAuth from "../Login/hooks/useAuth";
import { useCookies } from "react-cookie";

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
    total,
    hasMore,
    loadingIconRef,
  } = useEmployeeList();
  const deleteEmployeeDialog = useAppSelector(
    (state) => state.ui?.deleteEmployeeDialog
  );
  const { logOut } = useAuth();
  // logOut();
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
            />
          </div>
          <div className="next-section">
            <div>
              <button
                onClick={() => {
                  logOut();
                }}
              >
                Logout
              </button>
            </div>
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
        {hasMore && <Loader innerRef={loadingIconRef} className="listing" />}
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
