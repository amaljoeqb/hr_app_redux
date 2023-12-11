import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import { useAppContext } from "../../store/app.context";
import { Employee } from "../../models";
import { useQuery } from "../../hooks";
import { Footer, Header } from "../../layout";
import { StyledEmployeeDetail } from "./EmployeeDetail.style";

export default function EmployeeDetail() {
  const employeeId = useParams<{ employeeId: string }>().employeeId;
  const appContext = useAppContext();
  const navigate = useNavigate();
  const { employees, skills, departments } = appContext.state;
  let employee: Employee | undefined = undefined;
  const urlParams = useQuery();
  const isEdit = urlParams.get("edit") === "true";

  if (employeeId) {
    employee = employees.find((employee) => employee.employeeId === employeeId);
  }

  if (employee === undefined && !isEdit) {
    navigate("/404");
    return null;
  }

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
        </section>
      </div>
      <Footer />
    </StyledEmployeeDetail>
  );
}
