import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddAnswer from './AddAnswer'

// functional component
const Question = ({ setCurrQ, question, isLoggedIn }) => {

  // console.log(qs.get(question.id))
  // qs.map(q => (
  //   if (q.id === question.id) {
  //     const currQ = q
  //   })
  // )
  if (question.questionText) {
    return (
      <div>
        <div className="question" id={question._id}>
          <h2>
            {question.questionText}
          </h2>
          <p>
            Author:&nbsp;
            {question.author}
          </p>
          <p>
            Answer:&nbsp;
            {question.answer}
          </p>
          {(!question.answer) && isLoggedIn && <AddAnswer setCurrQ={setCurrQ} question={question} />}
        </div>
      </div>
    )
  }
  return null
}

export default Question
