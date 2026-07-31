import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TicketBooking from './TicketBooking.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <TicketBooking />
  </StrictMode>,
)
