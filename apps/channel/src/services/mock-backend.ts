import { PageConfig } from '../types/widget-config';

export async function fetchWidgetsConfig(pageId: string): Promise<PageConfig> {
  // Имитируем задержку сети
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const configs: Record<string, PageConfig> = {
    'dashboard': {
      pageId: 'dashboard',
      widgets: [
        {
          id: 'widget-1',
          type: 'counter',
          remote: 'widget@http://localhost:3001/remoteEntry.js',
          component: 'Widget',
          props: { title: 'Dashboard Counter' }
        },
        {
          id: 'widget-2',
          type: 'counter',
          remote: 'widget@http://localhost:3001/remoteEntry.js',
          component: 'Widget',
          props: { title: 'Secondary Counter' }
        }
      ]
    },
    'analytics': {
      pageId: 'analytics',
      widgets: [
        {
          id: 'analytics-widget',
          type: 'counter',
          remote: 'widget@http://localhost:3001/remoteEntry.js',
          component: 'Widget',
          props: { title: 'Analytics Counter' }
        }
      ]
    },
    'future': {
      pageId: 'future',
      widgets: [
        {
          id: 'future-widget-1',
          type: 'chart',
          remote: 'analytics@http://localhost:3002/remoteEntry.js',
          component: 'ChartWidget',
          props: { chartType: 'line', data: [1, 2, 3, 4, 5] }
        },
        {
          id: 'future-widget-2',
          type: 'table',
          remote: 'data@http://localhost:3003/remoteEntry.js',
          component: 'DataTable',
          props: { columns: ['Name', 'Value'], data: [['Item 1', 100], ['Item 2', 200]] }
        }
      ]
    },
    'empty': {
      pageId: 'empty',
      widgets: []
    }
  };
  
  return configs[pageId] || { pageId, widgets: [] };
} 