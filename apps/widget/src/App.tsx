import React from 'react';
import Widget from './Widget';

function App() {
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Widget Application</h1>
            <p>This is a widget application that exports a widget component via module federation.</p>
            
            <Widget title="Local Widget Demo" />
        </div>
    );
}

export default App; 
