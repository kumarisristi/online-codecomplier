import api from "./api";
import { AuthResponse } from "../types/user";

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post("/auth/login", { email, password });
  return data.data as AuthResponse;
}

export async function register(name: string, email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post("/auth/register", { name, email, password });
  return data.data as AuthResponse;
}
