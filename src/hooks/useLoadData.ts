import { useEffect, useState } from "react";
import { useAppDispatch } from "../store/store";
import {
  fetchDepartments,
  fetchSkills,
} from "../store/slices/staticData.slice";
import useAuth from "../pages/Login/hooks/useAuth";

export default function useLoadData() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (user.isAuth) {
      setLoading(true);
      const skills = dispatch(fetchSkills());
      const departments = dispatch(fetchDepartments());
      Promise.all([skills, departments]).then(() => {
        setLoading(false);
      });
    }
  }, [dispatch, user.isAuth]);

  return loading;
}
