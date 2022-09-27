import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import DefaultProvider from './providers/default.provider'
import App from './views/App'
import '../node_modules/leaflet/dist/leaflet.css'
import "react-datepicker/dist/react-datepicker.css";
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <DefaultProvider>
            <App />
        </DefaultProvider>
    </React.StrictMode>
)
