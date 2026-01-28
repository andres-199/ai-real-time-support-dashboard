import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useSocket } from './presentation/hooks/useSocket'

function App() {
  const [count, setCount] = useState(0)
  const { isConnected } = useSocket();

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      <div className="card">
         <div style={{
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '8px',
            backgroundColor: isConnected ? '#e6fffa' : '#fff5f5',
            color: isConnected ? '#2c7a7b' : '#c53030',
            border: `1px solid ${isConnected ? '#38b2ac' : '#fc8181'}`
          }}>
            <strong>Socket Status: </strong>
            {isConnected ? 'Connected 🟢' : 'Disconnected 🔴'}
        </div>

        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
