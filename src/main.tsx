import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { EntryGate } from './components/EntryGate.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EntryGate>
      <App />
    </EntryGate>
  </StrictMode>,
)
