export type AppsRegistry = Record<
  string,
  {
    bundlePath: string;
    modules: string[];
  }
>;
export type RouteToLayoutBindingRegistry = Record<
  string,
  {
    template: string;
    zonesContent: Record<
      string,
      { app: string; module: string; order?: number }[]
    >;
  }
>;
export type LayoutTemplateRegistry = Record<
    string,
    {
        markup: {
            zones: string[];
            settings: {};
        }[];
        settings: {};
    }
>
export type ApplicationConfig = {
  appsRegistry: AppsRegistry;
  layoutTemplateRegistry: LayoutTemplateRegistry;
  routeToLayoutBindingRegistry: RouteToLayoutBindingRegistry;
};
