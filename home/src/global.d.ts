// todo: rename Module to something not node-specific?
type Module = {
  bundlePath: string;
  module: string;
  scope: string;
};
type ModuleParameters = {
  moduleUniqueName: string; // keyof ?
};

type Row = {
  id: number;
  zones: string[]; // keyof ?
  settings: {};
};
type LayoutTemplate = {
  rows: Row[];
  settings: {};
};

type RouteToLayoutBinding = Record<
  string,
  {
    template: string; // keyof ?
    zonesContent: Record<string, ModuleParameters[]>;
  }
>;
type ApplicationMetadata = {
  modules: Record<string, Module>;
  routeToLayoutBinding: RouteToLayoutBinding;
  layoutTemplateMap: Record<string, LayoutTemplate>;
};
