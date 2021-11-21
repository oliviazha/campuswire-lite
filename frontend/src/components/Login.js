import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const loginUser = async () => {
    try {
      const { data } = await axios.post('/account/login', { username, password })
      if (data === 'user logged in successfully') {
        navigate('../')
      } else {
        window.alert('login error! try again')
      }
    } catch (err) {
      window.alert('login error! try again')
    }
  }

  return (
    <div className="login">
      <h1>Log In</h1>
      Username:
      <br />
      <input onChange={e => setUsername(e.target.value)} />
      <br />
      Password:
      <br />
      <input onChange={e => setPassword(e.target.value)} />
      <br />
      <button type="button" onClick={() => loginUser()}> Log In </button>
      <p>
        Don&apos;t have an account?&nbsp;
        <Link to="/signup">Sign up!</Link>
      </p>
    </div>
  )
}

export default Login
