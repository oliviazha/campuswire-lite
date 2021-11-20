import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [succeeded, setSucceeded] = useState(false)
  const navigate = useNavigate()

  const loginUser = async () => {
    const { data } = await axios.post('/account/login', { username, password })
    console.log('calling loginuser')
    if (data === 'user logged in successfully') {
      setSucceeded(true)
      navigate('../')
    } else {
      window.alert('login error! try again')
    }
  }

  return (
    <div className="login">
      <h1>Log In</h1>
      {/* <>
        {data.map(user => <p> {user.username} </p>)}
      </> */}
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
        Don't have an account?&nbsp;
        <Link to="/signup">Sign up!</Link>
      </p>
    </div>
  )
}

export default Login
