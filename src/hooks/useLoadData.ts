import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/store";
import {
  fetchDepartments,
  fetchSkills,
} from "../store/slices/staticData.slice";

export default function useLoadData() {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const skills = dispatch(fetchSkills);
    const departments = dispatch(fetchDepartments);
    Promise.all([skills, departments]).then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading;
}
