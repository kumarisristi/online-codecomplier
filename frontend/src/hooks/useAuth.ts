import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { setCredentials, logout as logoutAction } from "../store/slices/authSlice";
import * as authApi from "../services/authApi";

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.auth);

  async function login(email: string, password: string) {
    const data = await authApi.login(email, password);
    dispatch(setCredentials(data));
    return data;
  }

  async function register(name: string, email: string, password: string) {
    const data = await authApi.register(name, email, password);
    dispatch(setCredentials(data));
    return data;
  }

  function logout() {
    dispatch(logoutAction());
  }

  return { user, token, isAuthenticated: !!token, login, register, logout };
}
