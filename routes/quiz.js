var express = require('express');
var router = express.Router();
const {
  models,

  db: { Sequelize, sequelize },
} = require('../models');
/* GET users listing. */
router.post('/', async function (req, res, next) {
  try {
    if (req.body) {
      console.log("🚀 ~ file: quiz.js:8 ~ router.post ~ req.body:", req.body)
      const {
        title,
        description,
        question
      } = req.body

      const t = await sequelize.transaction({});
      const quizData = await models.Quiz.create({ title, description }, { transaction: t })

      for (let i of question) {
        const obj = {
          quizId: quizData.id,
          question: i.question
        }
        const questionData = await models.Question.create(obj, { transaction: t })
        for (const single of i.options) {
          const optionObj = {
            questionId: questionData.id,
            answer: single.answer,
            isCorrect: single.isCorrect
          }
          const optionData = await models.Option.create(optionObj, { transaction: t })
        }
      }
      await t.commit()

      const response = await models.Quiz.findOne({
        where: {
          id:quizData.id
        },
        include: [{
          model: models.Question,
          include: [{
            model: models.Option
          }]
        }]
      })
      res.status(201).json({
        success: true,
        error: null,
        data: response
      });
    }
  } catch (error) {
    console.log("🚀 ~ file: quiz.js:9 ~ router.post ~ error:", error)
    res.status(401).json({
      success: false,
      error,
      data: null
    });
  }
});

router.get('/', async function (req, res, next) {
  try {

    const response = await models.Quiz.findAll({
      include: [{
        model: models.Question,
        include: [{
          model: models.Option
        }]
      }]
    })
    res.status(200).json({
      success: true,
      error: null,
      data: response
    });

  } catch (error) {
    console.log("🚀 ~ file: quiz.js:9 ~ router.post ~ error:", error)
    res.status(401).json({
      success: false,
      error,
      data: null
    });
  }
});

router.get('/:id', async function (req, res, next) {
  try {

    if (req.params.id) {
      const id = +req.params.id
      console.log("🚀 ~ file: quiz.js:8 ~ router.post ~ req.body:", req.params.id)
      const response = await models.Quiz.findOne({
        where: {
          id
        },
        include: [{
          model: models.Question,
          include: [{
            model: models.Option
          }]
        }]
      })
      res.status(200).json({
        success: true,
        error: null,
        data: response
      });
    }
  } catch (error) {
    console.log("🚀 ~ file: quiz.js:9 ~ router.post ~ error:", error)
    res.status(401).json({
      success: false,
      error,
      data: null
    });
  }
});


module.exports = router;
