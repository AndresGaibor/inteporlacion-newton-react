import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import InterpolationApp from './InterpolationApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InterpolationApp />
  </StrictMode>
)
