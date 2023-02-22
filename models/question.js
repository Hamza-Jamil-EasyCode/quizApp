const { DataTypes, Model } = require('sequelize');
let sequelize = require('../common/databaseConnection');
const { Quiz } = require('./quiz');

class Question extends Model {}

Question.init(
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		question: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
        quizId: {
			type: DataTypes.INTEGER,
			allowNull: false,
            references: {
				model: Quiz,
			},
        }
	},
	{
		tableName: 'question',
		timestamps: true,
		paranoid: true,
		sequelize,
	}
);

module.exports = { Question };
