import React from "react";
import Landing from "./components/Landing";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Products from "./components/Products";
import AppLayout from "./layouts/app-layout";
import BuyProduct from "./components/BuyProduct";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Landing />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/buyproduct",
          element: <BuyProduct />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
