import React, { useState } from 'react';

interface WidgetProps {
    title?: string;
}

const Widget: React.FC<WidgetProps> = ({ 
    title = 'Embedded Widget'
}) => {
    const [count, setCount] = useState(0);

    const containerStyle = {
        border: '2px solid #007bff',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px 0',
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        fontFamily: 'Arial, sans-serif',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    };

    const buttonStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        padding: '8px 16px',
        margin: '5px',
        cursor: 'pointer',
    };

    return (
        <div style={containerStyle}>
            <h3 style={{ margin: '0 0 15px 0', color: '#3498db' }}>
                {title}
            </h3>
            
            <div style={{ marginBottom: '15px' }}>
                <p>Counter: {count}</p>
                <button 
                    style={buttonStyle} 
                    onClick={() => setCount(count + 1)}
                >
                    Increment
                </button>
                <button 
                    style={{...buttonStyle, backgroundColor: '#dc3545'}} 
                    onClick={() => setCount(count - 1)}
                >
                    Decrement
                </button>
            </div>
        </div>
    );
};

export default Widget; 
