import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AddQuestion = () => {
  const [question, changeQuestion] = useState('')
  const [isAddQ, setIsAddQ] = useState(false)
  const newQ = async () => {
    const { data } = await axios.post('/questions/add', { questionText: question })
    if (data !== 'question created') {
      window.alert('error creating question')
    }
  }

  return (
    <div>
      <div>
        <button type="button" onClick={() => setIsAddQ(true)}> Add New Question </button>
      </div>
      {isAddQ && (
      <div className="newQ-form">
        <>
          Question:
          <br />
          <textarea id="new-q" value={question} onChange={e => changeQuestion(e.target.value)} placeholder="Write your question..." />
          <br />
        </>
        <button
          type="button"
          id="submit"
          onClick={() => {
            newQ()
            setIsAddQ(false)
          }}
        >
          Submit Question
        </button>
        <br />
        <button
          type="button"
          id="close"
          onClick={() => {
            setIsAddQ(false)
          }}
        >
          Close
        </button>
      </div>
      )}
    </div>
  )
}

export default AddQuestion
