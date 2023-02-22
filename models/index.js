const Sequelize = require('sequelize');
const db = {};
let sequelize = require('../common/databaseConnection');

const { Quiz } = require('./quiz');
const { Option } = require('./option');
const { Question } = require('./question');


Quiz.hasMany(Question, {
	foreignKey: 'quizId',
});
Question.belongsTo(Quiz, {
	foreignKey: 'quizId',
});
Question.hasMany(Option, {
	foreignKey: 'questionId',
});

Option.belongsTo(Question, {
	foreignKey: 'questionId',
});

const models = {
    Quiz,
    Option,
    Question
}



sequelize.models = models;
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = { db, models };