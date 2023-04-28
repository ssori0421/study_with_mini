import React from 'react';
import { CounterProvider } from './context/counterContext';
import Counter from './component/Counter';

function App() {
  return (
    <div>
      <CounterProvider>
        <Counter />
      </CounterProvider>
    </div>
  );
}

export default App;
