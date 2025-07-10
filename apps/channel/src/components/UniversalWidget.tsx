import React, { useState, useEffect } from 'react';
import { WidgetConfig } from '../types/widget-config';
import { loadWidgetDynamically } from '../services/dynamic-widget-loader';

interface UniversalWidgetProps {
  config: WidgetConfig;
}

const UniversalWidget: React.FC<UniversalWidgetProps> = ({ config }) => {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWidgetComponent = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Динамически загружаем виджет без hard dependencies
        const WidgetComponent = await loadWidgetDynamically(config.remote, config.component);
        
        setComponent(() => WidgetComponent);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load widget');
        console.error('Failed to load widget:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWidgetComponent();
  }, [config]);

  if (loading) {
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#e3f2fd', 
        border: '1px solid #2196f3',
        borderRadius: '4px',
        textAlign: 'center'
      }}>
        Loading widget: {config.type} ({config.component})...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#ffebee', 
        border: '1px solid #f44336',
        borderRadius: '4px',
        color: '#c62828'
      }}>
        <strong>Widget Error:</strong> {error}
        <br />
        <small>Remote: {config.remote}</small>
        <br />
        <small>Component: {config.component}</small>
      </div>
    );
  }

  if (!Component) {
    return null;
  }

  // Рендерим компонент с переданными пропсами
  return <Component {...config.props} />;
};

export default UniversalWidget; 