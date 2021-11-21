import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AddAnswer = ({ setCurrQ, question }) => {
  const [answer, setAnswer] = useState('')
  const [answered, setAnswered] = useState(false)

  const newAns = async () => {
    const { _id } = question
    const { data } = await axios.post('/questions/answer', { _id, answer })
    setCurrQ(data)
    if (!data.answer) {
      window.alert('error answering question')
    }
  }

  if (!answered) {
    return (
      <div>
        <>
          Answer this question:
          <br />
          <textarea id="new-ans" value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Write your answer..." />
          <br />
        </>
        <button
          type="button"
          id="submit"
          onClick={() => {
            newAns()
            setAnswered(true)
            // setCurrQ(updatedQ)
          }}
        >
          Submit Answer
        </button>
      </div>
    )
  }
  return null
}

export default AddAnswer
