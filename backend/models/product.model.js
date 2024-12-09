import { DataTypes } from "sequelize";
import sequelize from "../configure/db.js";
// DataTypes
// sequelize
export const Product = sequelize.define("Product", {
	id: {
	  type: DataTypes.INTEGER,
	  primaryKey: true,
	  autoIncrement: false, // IDs in your seed data are manually provided
	},
	title: {
	  type: DataTypes.STRING,
	  allowNull: false,
	},
	price: {
	  type: DataTypes.FLOAT,
	  allowNull: false,
	},
	description: {
	  type: DataTypes.TEXT,
	  allowNull: false,
	},
	category: {
	  type: DataTypes.STRING,
	  allowNull: false,
	},
	image: {
	  type: DataTypes.STRING,
	  allowNull: false,
	},
	sold: {
	  type: DataTypes.BOOLEAN,
	  allowNull: false,
	},
	dateOfSale: {
	  type: DataTypes.DATE,
	  allowNull: false,
	},
  });