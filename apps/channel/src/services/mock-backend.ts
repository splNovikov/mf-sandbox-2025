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
    'empty': {
      pageId: 'empty',
      widgets: []
    }
  };
  
  return configs[pageId] || { pageId, widgets: [] };
} 