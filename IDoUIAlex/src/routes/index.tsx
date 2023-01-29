import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useOutlet,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import OrdersList from "./orders";
import { QueryClient, QueryClientProvider } from "react-query";
import Grid from "@mui/material/Grid";
import { useAuth, AuthProvider } from "../hooks/AuthProvider";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

const AuthLayout = () => {
  const outlet = useOutlet();
  return <AuthProvider>{outlet}</AuthProvider>;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />} path="/">
      <Route
        element={
          <ProtectedRoute>
            <OrdersList />
          </ProtectedRoute>
        }
        path="/orders"
      />
    </Route>,
  ),
);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Grid container style={{ flex: "1 1 auto" }}>
        <RouterProvider router={router} />
      </Grid>
    </QueryClientProvider>
  );
}
