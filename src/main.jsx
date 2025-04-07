import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ConsumerSubscription from './assets/consumer-subscription.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConsumerSubscription />
  </StrictMode>,
)
