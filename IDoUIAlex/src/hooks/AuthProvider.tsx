import React, { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useMutation, UseMutateFunction } from "react-query";
import { CreateUser, LoginApi } from "../../api/src";
import { call } from "../../api/callWrapper";
import { Setter } from "../types/setter";

type AuthContext = {
  token: string;
  creds: CreateUser;
  setCreds: Setter<CreateUser>;
  login: UseMutateFunction<void, unknown, void, unknown>;
  loginLoading: boolean;
  logout: VoidFunction;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { storedValue, setValue } = useLocalStorage("token", "");
  const [creds, setCreds] = React.useState<CreateUser>({});
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation(async () => {
    const result = await call(LoginApi).loginPost({ createUser: { ...creds } });
    setValue(result.token || "");
    navigate("/orders");
  });

  const logout = () => {
    setCreds({});
    setValue("");
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      token: storedValue,
      creds,
      setCreds,
      login,
      loginLoading: isLoading,
      logout,
    }),
    [storedValue, creds, isLoading],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Not in AuthProvider");
  }
  return context;
};
