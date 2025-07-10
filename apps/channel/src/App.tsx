import React, { useState, Suspense, useEffect } from 'react';

// Динамический импорт виджета через module federation
const Widget = React.lazy(() => import('widget/Widget'));

function App() {
    const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);

    useEffect(() => {
        const checkWidget = async () => {
            try {
                await import('widget/Widget');
                setIsWidgetLoaded(true);
            } catch (error) {
                console.error('Failed to load widget:', error);
            }
        };

        checkWidget();
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Channel Application</h1>
            <p>This is the main channel app that embeds a widget via module federation.</p>

            <div style={{ 
                border: '2px solid #007bff', 
                borderRadius: '8px', 
                padding: '20px', 
                margin: '20px 0',
                backgroundColor: '#f8f9fa'
            }}>
                <h2>Embedded Widget:</h2>

                {isWidgetLoaded ? (
                    <Suspense fallback={<div>Loading widget...</div>}>
                        <Widget title="Channel Widget" />
                    </Suspense>
                ) : (
                    <div style={{ 
                        padding: '20px', 
                        backgroundColor: '#f8d7da', 
                        border: '1px solid #f5c6cb',
                        borderRadius: '4px',
                        color: '#721c24'
                    }}>
                        Widget is not available. Make sure widget app is running on port 3001.
                    </div>
                )}
            </div>

        </div>
    );
}

export default App;
