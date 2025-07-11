import {
  ApplicationConfig,
  AppsRegistry,
  LayoutTemplateRegistry,
  RouteToLayoutBindingRegistry,
} from "../types/ApplicationConfig";
import { getUniqueModuleName } from "../utils/getUniqueModuleName";

const mapAppsRegistry = (appsRegistry: AppsRegistry): Record<string, Module> =>
  Object.keys(appsRegistry).reduce((acc, app) => {
    const modules = appsRegistry[app]?.modules?.reduce(
      (modulesAcc: Record<string, Module>, moduleName: string) => {
        return {
          ...modulesAcc,
          [getUniqueModuleName(app, moduleName)]: {
            bundlePath: appsRegistry[app].bundlePath,
            module: moduleName,
            scope: app,
          },
        };
      },
      <Record<string, Module>>{},
    );

    return { ...acc, ...modules };
  }, {});

const mapRouteToLayoutBindingRegistry = (
  routeToLayoutBindingRegistry: RouteToLayoutBindingRegistry,
): RouteToLayoutBinding =>
  Object.keys(routeToLayoutBindingRegistry).reduce((acc, route) => {
    const { template, zonesContent: content } =
      routeToLayoutBindingRegistry[route];

    const zonesContent = Object.keys(content).reduce(
      (zonesAcc, zone) => {
        return {
          ...zonesAcc,
          [zone]: content[zone].map((mod) => ({
            // todo: implement order by mod.order prop
            moduleUniqueName: getUniqueModuleName(mod.app, mod.module),
          })),
        };
      },
      <Record<string, ModuleParameters[]>>{},
    );

    return {
      ...acc,
      [route]: { template, zonesContent },
    };
  }, {});

const mapLayoutTemplateRegistry = (
  layoutTemplateRegistry: LayoutTemplateRegistry,
): Record<string, LayoutTemplate> =>
  Object.keys(layoutTemplateRegistry).reduce((acc, templateName) => {
    const { markup, settings } = layoutTemplateRegistry[templateName];
    const rows: Row[] = markup.map((row, index) => ({
      id: index,
      zones: row.zones,
      settings: row.settings,
    }));

    return { ...acc, [templateName]: { rows, settings } };
  }, {});

const buildApplicationMetaData = (applicationConfig: ApplicationConfig) => {
  const { appsRegistry, routeToLayoutBindingRegistry, layoutTemplateRegistry } =
    applicationConfig;
  if (!appsRegistry) {
    console.error("Apps Registry has not been declared in configuration file");
  }
  const modules = !appsRegistry ? {} : mapAppsRegistry(appsRegistry);

  if (!routeToLayoutBindingRegistry) {
    console.error(
      "Route To Layout Registry has not been declared in configuration file",
    );
  }
  const routeToLayoutBinding = !routeToLayoutBindingRegistry
    ? {}
    : mapRouteToLayoutBindingRegistry(routeToLayoutBindingRegistry);

  if (!layoutTemplateRegistry) {
    console.error(
      "Layout Template Registry has not been declared in configuration file",
    );
  }
  const layoutTemplateMap = !layoutTemplateRegistry
    ? {}
    : mapLayoutTemplateRegistry(layoutTemplateRegistry);

  return {
    modules,
    routeToLayoutBinding,
    layoutTemplateMap,
  };
};

export const useApplicationMetadata = (
  applicationConfig?: ApplicationConfig,
): ApplicationMetadata | null => {
  if (!applicationConfig) {
    return null;
  }

  return buildApplicationMetaData(applicationConfig);
};
