import {
  Employee,
  Skill,
  Department,
  FetchEmployeesProps,
  FetchEmployeesGlobalProps,
} from "../../models";
import {
  EmployeeGlobal,
  SkillGlobal,
  DepartmentGlobal,
  EmployeeRequest,
  MoreDetails,
} from "../models";

export function getEmployeeFromEmployeeGlobal(
  employeeGlobal: EmployeeGlobal
): Employee {
  const getSalary = () => {
    if (!employeeGlobal.salary) return undefined;
    const salary = parseInt(employeeGlobal.salary);
    if (isNaN(salary)) return undefined;
    return salary;
  };
  let name = employeeGlobal.firstName;
  if (employeeGlobal.lastName) {
    name += ` ${employeeGlobal.lastName}`;
  }
  return {
    employeeId: employeeGlobal.id.toString(),
    name,
    email: employeeGlobal.email,
    designation: employeeGlobal.designation,
    department: employeeGlobal.department
      ? {
          departmentId: employeeGlobal.department?.id.toString(),
          department: employeeGlobal.department?.department,
        }
      : undefined,
    skills: employeeGlobal.skills.map((skill) => ({
      skillId: skill.id.toString(),
      skill: skill.skill,
    })),
    salary: getSalary(),
    joiningDate: employeeGlobal.dateOfJoining,
    dateOfBirth: employeeGlobal.dob,
    moreDetails: employeeGlobal.moreDetails,
    profilePic:
      employeeGlobal.moreDetails !== undefined
        ? getProfilePic(employeeGlobal.moreDetails)
        : undefined,
  };
}

export function setProfilePic(
  moreDetails: string | undefined,
  profilePic: string | undefined
) {
  let details: any = {};
  try {
    if (moreDetails) {
      details = JSON.parse(moreDetails);
    }
  } finally {
    if (profilePic) {
      details.photoId = profilePic;
    }
    return JSON.stringify(details);
  }
}

export function getProfilePic(moreDetails: string) {
  try {
    const details: MoreDetails = JSON.parse(moreDetails);
    if (details.photoId === undefined || details.photoId === "") {
      return undefined;
    }
    return details.photoId;
  } catch (e) {
    return undefined;
  }
}

export function getEmployeeRequestFromEmployee(
  employee: Employee
): EmployeeRequest {
  const firstName = employee.name.split(" ")[0];
  const lastName = employee.name.substring(firstName.length + 1);
  const employeeId = parseInt(employee.employeeId);
  return {
    id: isNaN(employeeId) ? undefined : employeeId,
    firstName,
    lastName,
    email: employee.email,
    designation: employee.designation,
    department: employee.department && {
      id: parseInt(employee.department?.departmentId),
    },
    skills: employee.skills.map((skill) => skill.skillId),
    salary: employee.salary?.toString(),
    dateOfJoining: employee.joiningDate,
    dob: employee.dateOfBirth,
    moreDetails: setProfilePic(employee.moreDetails, employee.profilePic),
  };
}

export function getSkillFromSkillGlobal(skillGlobal: SkillGlobal): Skill {
  return {
    skillId: skillGlobal.id.toString(),
    skill: skillGlobal.skill,
  };
}

export function getDepartmentFromDepartmentGlobal(
  departmentGlobal: DepartmentGlobal
): Department {
  return {
    departmentId: departmentGlobal.id.toString(),
    department: departmentGlobal.department,
  };
}

export function getEmployeeGlobalFetchParams(
  props: FetchEmployeesProps
): FetchEmployeesGlobalProps {
  let sortKey: string = "id";
  switch (props.sortBy) {
    case "name":
      sortKey = "firstName";
      break;
    case "joiningDate":
      sortKey = "dateOfJoining";
      break;
    case "dateOfBirth":
      sortKey = "dob";
      break;
    case "department":
      sortKey = "department.id";
      break;
    case "employeeId":
    case "profilePic":
      sortKey = "id";
      break;
    default:
      sortKey = props.sortBy;
  }
  const params: FetchEmployeesGlobalProps = {
    limit: props.limit,
    offset: props.offset,
    sortDir: props.sortDir,
    sortBy: sortKey,
    search: props.search,
    skillIds: props.skills.join(","),
  };
  return params;
}
