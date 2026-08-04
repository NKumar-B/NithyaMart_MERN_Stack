import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { BookStoreProvider } from './context/BookStoreContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <BookStoreProvider>
        <App />
      </BookStoreProvider>
    </HashRouter>
  </StrictMode>,
)
