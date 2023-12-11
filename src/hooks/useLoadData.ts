import { useEffect, useState } from "react";
import { useApi } from "./";

export default function useLoadData() {
  const [loading, setLoading] = useState(true);
  const api = useApi();

  useEffect(() => {
    const employees = api.getEmployees();
    const skills = api.getSkills();
    const departments = api.getDepartments();
    Promise.all([employees, skills, departments]).then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading;
}
