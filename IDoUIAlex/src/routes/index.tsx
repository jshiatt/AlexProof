import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrdersList from "./orders";
import { QueryClient, QueryClientProvider } from "react-query";
import Grid from "@mui/material/Grid";

const router = createBrowserRouter([
  {
    path: "/orders",
    element: <OrdersList />,
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Grid container direction="column" style={{ height: "100%" }} wrap="nowrap">
        <Grid container style={{ height: "56px", borderBottom: "1px solid #C4C4C4" }}>
          hi
        </Grid>
        <Grid container style={{ flex: "1 1 auto" }}>
          <RouterProvider router={router} />
        </Grid>
      </Grid>
    </QueryClientProvider>
  );
}
