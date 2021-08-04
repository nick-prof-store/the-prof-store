const router = require('express').Router()
const { models: { Image }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    console.log('hello');
    const images = await Image.findAll({})
    res.send(images)
  } catch (err) {
    next(err)
  }
})
