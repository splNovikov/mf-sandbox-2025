import React, { useState, useEffect } from 'react';
import { fetchWidgetsConfig } from './services/mock-backend';
import UniversalWidget from './components/UniversalWidget';
import { WidgetConfig } from './types/widget-config';

function App() {
  const [widgets, setWidgets] = useState<WidgetConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWidgets = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const config = await fetchWidgetsConfig(currentPage);
        setWidgets(config.widgets);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load widgets config');
        console.error('Failed to load widgets config:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWidgets();
  }, [currentPage]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Channel Application</h1>
      <p>This channel dynamically loads ANY widgets based on backend configuration.</p>

      {/* Переключатель страниц */}
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setCurrentPage('dashboard')}
          style={{ 
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: currentPage === 'dashboard' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Dashboard
        </button>
        <button 
          onClick={() => setCurrentPage('analytics')}
          style={{ 
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: currentPage === 'analytics' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Analytics
        </button>
        <button 
          onClick={() => setCurrentPage('empty')}
          style={{ 
            padding: '8px 16px',
            backgroundColor: currentPage === 'empty' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Empty Page
        </button>
      </div>

      {/* Ошибка загрузки конфигурации */}
      {error && (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#ffebee', 
          border: '1px solid #f44336',
          borderRadius: '4px',
          color: '#c62828',
          marginBottom: '20px'
        }}>
          Configuration Error: {error}
        </div>
      )}

      {/* Загрузка конфигурации */}
      {loading && (
        <div style={{ 
          padding: '20px', 
          backgroundColor: '#e3f2fd', 
          border: '1px solid #2196f3',
          borderRadius: '4px',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          Loading widgets configuration...
        </div>
      )}

      {/* Универсальные виджеты */}
      {!loading && !error && (
        <div>
          <h2>Dynamic Widgets (Page: {currentPage})</h2>
          {widgets.length === 0 ? (
            <div style={{ 
              padding: '20px', 
              backgroundColor: '#fff3cd', 
              border: '1px solid #ffc107',
              borderRadius: '4px',
              color: '#856404'
            }}>
              No widgets configured for this page.
            </div>
          ) : (
            widgets.map(widget => (
              <div key={widget.id} style={{ marginBottom: '20px' }}>
                <UniversalWidget config={widget} />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
