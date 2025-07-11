import React from "react";

import { useRouteMetadata } from "../hooks/useRouteMetadata";
import Layout from "../components/Layout";

export const HomePage = () => {
  const routeMetadata = useRouteMetadata({ filter: { route: "/" } });

  if (!routeMetadata) {
    return <div>Loading configuration...</div>;
  }

  const { template, zonesContent, modules } = routeMetadata;

  return (
    <Layout template={template} zonesContent={zonesContent} modules={modules} />
  );
};
