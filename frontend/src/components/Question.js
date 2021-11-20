import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddAnswer from './AddAnswer'

// functional component
const Question = ({ question, isLoggedIn }) => {
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
          {(!question.answer) && isLoggedIn && <AddAnswer question={question} />}
        </div>
      </div>
    )
  }
  return null
}

export default Question
