import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import IndexProvider from './providers/Index.provider'
import IndexView from './views/Index.view'
import '../node_modules/leaflet/dist/leaflet.css'
import 'react-datepicker/dist/react-datepicker.css'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <IndexProvider>
            <IndexView />
        </IndexProvider>
    </React.StrictMode>
)
