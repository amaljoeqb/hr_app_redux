import { Employee, Skill } from "../models";

/**
 * Get data from url
 * @param {string} url url of request
 */
export async function getData(url: string) {
  return fetch(url).then((response) => response.json());
}

/**
 * Function to add span for search term in a string
 * @param {string} text - Text to highlight
 * @param {string} searchTerm - Search term
 */
export function highlightSearchTerm(text: string, searchTerm: string) {
  try {
    if (typeof text !== "string" && typeof text !== "number") {
      return text;
    }
    const textString = text.toString();
    const lowerCaseText = textString.toString().toLowerCase();
    if (!searchTerm || !lowerCaseText.includes(searchTerm)) {
      return text;
    }
    const startIndex = lowerCaseText.toString().indexOf(searchTerm);
    const endIndex = startIndex + searchTerm.length;
    const highlightedText =
      textString.toString().slice(0, startIndex) +
      '<span class="highlight">' +
      textString.slice(startIndex, endIndex) +
      "</span>" +
      textString.slice(endIndex);
    return highlightedText;
  } catch (e) {
    return text;
  }
}

/**
 * Get rupees format for a number
 * @param {number} number - Number to format
 */
export function getRupeesFormat(number: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(number);
}

/**
 * Convert date object to dd/mm/yyyy
 * @param {Date} date - Date object
 */
export function convertFromDate(date: Date) {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Convert date string to date object
 * @param {string} dateString - Date string in dd/mm/yyyy format
 */
export function convertToDate(dateString: string) {
  const dateParts = dateString.split("/").map((part) => parseInt(part));
  return new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
}

/**
 * Transform skills list to span elements
 */
export function skillsToString(skills: Skill[]) {
  return skills.map((skill) => skill.skill).join(", ");
}

/**
 * Fuction to search employees array based on a search term
 * @param {array} employees - Array of employees
 * @param {string} searchTerm - Term to search for
 */
export function searchEmployees(employees: Employee[], searchTerm: string) {
  try {
    const lowerCaseValue = searchTerm.toLowerCase();
    return Object.values(employees).filter((employee) =>
      Object.values(employee).some(
        (value) =>
          (typeof value === "string" || typeof value === "number") &&
          value.toString().toLowerCase().includes(lowerCaseValue)
      )
    );
  } catch (e) {
    return [];
  }
}

/**
 * Function to get next employee ID
 * @param {Employee[]} employees - Array of employees
 * @returns {string} - Next employee ID
 */
export function getNextEmployeeId(employees: Employee[]) {
  const employeeIds = employees.map((employee) => employee.employeeId);
  const maxId = Math.max(...employeeIds.map((id) => parseInt(id)));
  return (maxId + 1).toString();
}

function isSkillsEqual(skills1: Skill[], skills2: Skill[]) {
  if (skills1.length !== skills2.length) return false;
  const skillIds1 = skills1.map((skill) => skill.skillId);
  const skillIds2 = skills2.map((skill) => skill.skillId);
  skillIds1.forEach((skill1) => {
    if (!skillIds2.includes(skill1)) return false;
  });

  return true;
}

/**
 * Checks if two employee objects are equal.
 * @param employee1 - The first employee object.
 * @param employee2 - The second employee object.
 * @returns True if the employee objects are equal, false otherwise.
 */
export function isEmployeeEqual(employee1: Employee, employee2: Employee) {
  return (
    employee1.employeeId === employee2.employeeId &&
    employee1.name === employee2.name &&
    employee1.email === employee2.email &&
    employee1.designation === employee2.designation &&
    employee1.department?.departmentId === employee2.department?.departmentId &&
    employee1.salary === employee2.salary &&
    employee1.joiningDate === employee2.joiningDate &&
    employee1.dateOfBirth === employee2.dateOfBirth &&
    isSkillsEqual(employee1.skills, employee2.skills)
  );
}

export function getEmployeeDiff(
  oldEmployee?: Employee,
  newEmployee?: Employee
) {
  if (!oldEmployee || !newEmployee) return {};
  else if (!oldEmployee) return newEmployee;
  else if (!newEmployee) return oldEmployee;

  const diff: Partial<Employee> = {};
  if (oldEmployee.name !== newEmployee.name) diff.name = oldEmployee.name;
  if (oldEmployee.email !== newEmployee.email) diff.email = oldEmployee.email;
  if (oldEmployee.designation !== newEmployee.designation)
    diff.designation = oldEmployee.designation;
  if (
    !(
      oldEmployee.department === undefined &&
      newEmployee.department === undefined
    ) &&
    (oldEmployee.department === undefined ||
      newEmployee.department === undefined ||
      oldEmployee.department?.departmentId !==
        newEmployee.department?.departmentId)
  )
    diff.department = oldEmployee.department;
  if (oldEmployee.salary !== newEmployee.salary)
    diff.salary = oldEmployee.salary;
  if (oldEmployee.joiningDate !== newEmployee.joiningDate)
    diff.joiningDate = oldEmployee.joiningDate;
  if (oldEmployee.dateOfBirth !== newEmployee.dateOfBirth)
    diff.dateOfBirth = oldEmployee.dateOfBirth;
  if (!isSkillsEqual(oldEmployee.skills, newEmployee.skills))
    diff.skills = oldEmployee.skills;
  return diff;
}
