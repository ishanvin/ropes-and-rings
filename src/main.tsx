import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { StoreProvider } from './context/StoreContext.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import App from './App.tsx'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
