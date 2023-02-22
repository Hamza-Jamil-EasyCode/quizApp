const {  DataTypes, Model } = require('sequelize');
let sequelize = require('../common/databaseConnection');

class Quiz extends Model {}

Quiz.init(
	{
		id: {
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		title: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
        description: {
			type: DataTypes.TEXT,
			allowNull: false,
		}
	},
	{
		tableName: 'quiz',
		timestamps: true,
		paranoid: true,
		sequelize,
	}
);

module.exports = { Quiz };
