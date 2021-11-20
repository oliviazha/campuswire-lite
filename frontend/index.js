import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import App from './src/App'
import Signup from './src/components/Signup'
import Login from './src/components/Login'

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  </Router>,
  document.getElementById('react-root'),
)
