import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./applayout";
import Repositories from "./components/repositories";
import { useState } from "react";
import { menuContext } from "./contexts/menu";
import { Auth, SAAS, Self } from "./components/auth";
import UnderConstruction from "./components/under";
import { Navigate } from 'react-router-dom';



function App() {
  const [state, set] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/auth/saas" replace />,
    },
    {
      path: "/app",
      element: <AppLayout />,
      children: [
        {
          path: "repositories",
          element: <Repositories />,
        },
        {
          path: "code-review",
          element: <UnderConstruction />,
        },
        {
          path: "cloud-security",
          element: <UnderConstruction />,
        },
        {
          path: "how-to-use",
          element: <UnderConstruction />,
        },
        {
          path: "settings",
          element: <UnderConstruction />,
        },
        {
          path: "report",
          element: <UnderConstruction />,
        },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
      children: [
        {
          path: "saas",
          element: <SAAS />,
        },
        {
          path: "self-hosted",
          element: <Self />,
        },
      ],
    },
  ]);

  return (
    <>
      <menuContext.Provider value={{ state, set }}>
        <RouterProvider router={router}></RouterProvider>
      </menuContext.Provider>
    </>
  );
}

export default App;
