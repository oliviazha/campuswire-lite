const express = require('express')

const router = express.Router()

const Question = require('../model/Question')
const isAuthenticated = require('../middlewares/isAuthenticated')

// get questions
router.get('/', async (req, res) => {
  try {
    res.json(await Question.find({}))
  } catch (err) {
    res.send('problems with getting questions')
  }
})

// new question
router.post('/add', isAuthenticated, async (req, res) => {
  const { questionText } = req.body

  try {
    const author = req.session.username
    await Question.create({ questionText, author: req.session.username })
    res.send('question created')
  } catch (err) {
    res.send('problems with creating a question')
  }
})

// add answer to question
router.post('/answer', isAuthenticated, async (req, res) => {
  const { _id, answer } = req.body

  try {
    const update = { answer }
    // const filter = { _id }
    const q = await Question.findOneAndUpdate({ _id }, update, { new: true })
    res.send('question answered')
    // res.json(q)
  } catch (err) {
    res.send('problems with adding an answer')
  }
})

module.exports = router
