import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router} from 'react-router-dom'
import ReactGA from 'react-ga4';

ReactGA.initialize('YOUR_MEASUREMENT_ID');

ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
)
