import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dailycontextprovider from '../Context/Dailycontext.jsx'
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
  <Dailycontextprovider>
    <App />
  </Dailycontextprovider>,
)
