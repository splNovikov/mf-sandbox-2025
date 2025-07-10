// Registry для доступных виджетов
const widgetRegistry: Record<string, () => Promise<any>> = {
  'widget': () => import('widget/Widget'),
  // В будущем можно добавить другие виджеты:
  // 'analytics': () => import('analytics/ChartWidget'),
  // 'data': () => import('data/DataTable'),
};

export async function loadWidget(remoteName: string, componentName: string) {
  const loader = widgetRegistry[remoteName];
  
  if (!loader) {
    throw new Error(`Unknown remote: ${remoteName}`);
  }
  
  const module = await loader();
  
  // Если компонент экспортируется как default
  if (module.default) {
    return module.default;
  }
  
  // Если компонент экспортируется по имени
  if (module[componentName]) {
    return module[componentName];
  }
  
  throw new Error(`Component '${componentName}' not found in remote '${remoteName}'`);
}

export function isRemoteAvailable(remoteName: string): boolean {
  return remoteName in widgetRegistry;
} 