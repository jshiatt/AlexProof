import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OrdersList from "./orders";

const router = createBrowserRouter([
  {
    path: "/orders",
    element: <OrdersList />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
