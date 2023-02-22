const {  DataTypes, Model } = require('sequelize');
let sequelize = require('../common/databaseConnection');
const { Question } = require('./question');

class Option extends Model {}

Option.init(
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		answer: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
        isCorrect: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
            defaultValue:false
		},
        questionId: {
			type: DataTypes.INTEGER,
			allowNull: false,
            references: {
				model: Question,
			},
        }
	},
	{
		tableName: 'option',
		timestamps: true,
		paranoid: true,
		sequelize,
	}
);

module.exports = { Option };
