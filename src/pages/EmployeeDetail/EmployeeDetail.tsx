import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import { Employee } from "../../models";
import { useQuery } from "../../hooks";
import { Footer, Header } from "../../layout";
import { StyledEmployeeDetail } from "./EmployeeDetail.style";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useEffect } from "react";
import { clearConfigAndFetchEmployee } from "../../store/slices/employees.slice";
import { Loader } from "../../components";

export default function EmployeeDetail() {
  const employeeId = useParams<{ employeeId: string }>().employeeId;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const skills = useAppSelector((state) => state.staticData.skills);
  const departments = useAppSelector((state) => state.staticData.departments);
  const employee: Employee | undefined = useAppSelector((state) =>
    state.employees.data.find((employee) => employee.employeeId === employeeId)
  );
  const loading = useAppSelector((state) => state.employees.loading);
  const urlParams = useQuery();
  const isEdit = urlParams.get("edit") === "true";

  useEffect(() => {
    if (employeeId && !employee) {
      dispatch(clearConfigAndFetchEmployee(employeeId));
    }
  }, [employeeId, dispatch]);

  return (
    <StyledEmployeeDetail>
      <Header />
      <div
        className={`popup emp-popup show-popup ${
          isEdit ? "edit-popup" : "view-popup"
        }`}
      >
        <section className="popup-content">
          <div className="form-header">
            <h2>
              <span
                className="material-symbols-outlined back-btn"
                onClick={() => {
                  navigate(-1);
                }}
              >
                arrow_back
              </span>

              <div className="add-heading">
                <span className="material-symbols-outlined"> add_circle </span>
              </div>
              <span className="heading-text">Employee</span>
              <div className="view-edit-heading flip-container">
                <div className="front">
                  <span className="material-symbols-outlined"> edit </span>
                </div>
                <div className="back">
                  <span className="material-symbols-outlined">visibility</span>
                </div>
              </div>
            </h2>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <EmployeeForm
              employee={employee}
              skills={skills}
              departments={departments}
              isView={!isEdit}
              className={isEdit ? "edit" : "view"}
              onEdit={() => {
                navigate(`/employee/${employeeId}?edit=true`);
              }}
              onSave={() => {
                navigate(-1);
              }}
            />
          )}
        </section>
      </div>
      <Footer />
    </StyledEmployeeDetail>
  );
}
