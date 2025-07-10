import { useState } from 'react';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Hello React + TypeScript + Webpack</h1>
            <button onClick={() => setCount(count + 1)}>
                count is {count}
            </button>
        </div>
    );
}

export default App;
