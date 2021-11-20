import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import AddAnswer from './components/AddAnswer'
import AddQuestion from './components/AddQuestion'
import Question from './components/Question'

const App = () => {

  const [qs, setQs] = useState([])
  const [currUser, setCurrUser] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currQ, setCurrQ] = useState('')

  const checkLoggedin = async () => {
    // console.log('logged in?', isLoggedIn)
    // console.log('user', currUser)
    try {
      const { data } = await axios.post('/account/isloggedin') // GET request
      if (data) {
        setCurrUser(data)
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    } catch (err) {
      setIsLoggedIn(false)
      console.log('error checking if loggedin')
    }
  }

  // useEffect(async () => {
  //   const { data: questions } = await axios.get('/questions') // GET request
  //   setQs(questions)
  //   checkLoggedin()
  // }, [])

  useEffect(() => {
    const getQuestions = async () => {
      const { data: questions } = await axios.get('/questions') // GET request
      setQs(questions)
      checkLoggedin()
    }
    getQuestions()
    const intervalID = setInterval(() => {
      getQuestions()
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  const logoutUser = async () => {
    console.log('in logoutUser')
    try {
      const { data } = await axios.post('/account/logout')
      if (data === 'user is logged out') {
        setIsLoggedIn(false)
        console.log('logged out')
      }
    } catch (err) {
      window.alert('logout error! try again')
    }
  }

  return (
    <>
      <div className="home">
        {/* <AddQuestion /> */}
        {isLoggedIn && (
          <div id="logged-in">
            <div id="nav-bar">
              <h1>Campuswire Lite</h1>
              <div className="greeting">
                <p>
                  Hi &nbsp;
                  {currUser}
                </p>
                <button type="button" className="logout" onClick={() => logoutUser()}> Log out </button>
              </div>
            </div>
            <AddQuestion currUser={currUser} />
          </div>
        )}
        {!isLoggedIn && (
          <div id="logged-out">
            <div id="nav bar">
              <h1>Campuswire Lite</h1>
            </div>
            <Link to="/login">
              <button type="button"> Log in to submit a question </button>
            </Link>
          </div>
        )}
        <div className="questions">
          <div className="column left">
            {qs.map(question => (
              <div key={question._id}>
                <button type="button" className="question-list" onClick={() => setCurrQ(question)}>
                  {question.questionText}
                </button>
                <br />
              </div>
            ))}
          </div>
          <div className="column right">
            <Question question={currQ} isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
