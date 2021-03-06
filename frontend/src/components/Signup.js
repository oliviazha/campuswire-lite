import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const createUser = async () => {
    const { data } = await axios.post('/account/signup', { username, password })
    if (data === 'user created') {
      navigate('../')
    } else {
      window.alert('sign up error! try again')
    }
  }

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      Username:
      <br />
      <input onChange={e => setUsername(e.target.value)} />
      <br />
      Password:
      <br />
      <input onChange={e => setPassword(e.target.value)} />
      <br />
      <button type="button" onClick={() => createUser()}> Sign Up </button>
      <p>
        Already have an account?&nbsp;
        <Link to="/login">Log in here!</Link>
      </p>
    </div>
  )
}
export default Signup
