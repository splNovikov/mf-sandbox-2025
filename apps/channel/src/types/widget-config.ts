export interface WidgetConfig {
  id: string;
  type: string;
  remote: string;
  component: string;
  props?: Record<string, any>;
}

export interface PageConfig {
  pageId: string;
  widgets: WidgetConfig[];
} 