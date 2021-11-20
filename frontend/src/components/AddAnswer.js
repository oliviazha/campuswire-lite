import React, { useState, useEffect } from 'react'
import axios from 'axios'

// functional component
const AddAnswer = ({ question }) => {
  const [answer, setAnswer] = useState('')
  const [answered, setAnswered] = useState('')

  const newAns = async () => {
    const id = question._id
    const { data } = await axios.post('/questions/answer', { id, answer })
    if (data === 'question answered') {
      console.log('question answered')
    } else {
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