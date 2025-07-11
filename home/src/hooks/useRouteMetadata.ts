import { useContext } from "react";
import { ApplicationContext } from "../components/App";

type Props = {
  filter: {
    route: string;
  };
};
type RouteMetadata = {
  template: LayoutTemplate;
  zonesContent: Record<string, ModuleParameters[]>;
  modules: Record<string, Module>
};
export const useRouteMetadata = ({
  filter: { route },
}: Props): RouteMetadata | null => {
  const applicationMetadata = useContext(ApplicationContext);

  if (!applicationMetadata) return null;

  const { routeToLayoutBinding, layoutTemplateMap, modules } =
    applicationMetadata;

  if (!routeToLayoutBinding[route]) {
    console.error("Route To Layout Binding not found");
    return null;
  }
  const { template: templateName, zonesContent } = routeToLayoutBinding[route];

  if (!layoutTemplateMap[templateName]) {
    console.error("Template not found");
  }
  const template = layoutTemplateMap[templateName] || {};

  return {
    template,
    zonesContent,
    modules
  };
};
