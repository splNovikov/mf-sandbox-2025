import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "../index.scss";

import MainLayout from "./MainLayout";
import { HomePage } from "../pages/HomePage";
import { AnyExamplePage } from "../pages/AnyExamplePage";
import { useApplicationConfigFile } from "../hooks/useApplicationConfigFile";
import { useApplicationMetadata } from "../hooks/useApplicationMetadata";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Error Page</div>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/any-example-page",
        element: <AnyExamplePage />,
      },
    ],
  },
]);

export const ApplicationContext = createContext<ApplicationMetadata | null>(
  null,
);

const App = () => {
  const { applicationConfig } = useApplicationConfigFile();
  const applicationMetadata = useApplicationMetadata(applicationConfig);

  return (
    <ApplicationContext.Provider value={applicationMetadata}>
      <RouterProvider router={router} />
    </ApplicationContext.Provider>
  );
};

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
