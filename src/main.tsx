import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TutorialProvider } from './utils/tutorialUtils'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TutorialProvider>
      <App />
    </TutorialProvider>
  </StrictMode>,
)
