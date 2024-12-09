import { Sequelize } from "sequelize"
import { DB_PASSWORD } from "./feature.js"


export const sequelize = new Sequelize('roxiler','root', `${DB_PASSWORD}`, {
	host:'localhost',
	dialect: 'mysql'

})