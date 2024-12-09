import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
const app= express() ;
const port=4000;
import { Sequelize } from 'sequelize';
app.use(express.json());
dotenv.config()

 import {sequelize} from './configure/db.js';
// import { Product } from './models/product.model.js';

import productRouter from './router/product.router.js'
import { Product } from './models/product.model.js';

 app.get("/get",async(req,res)=>{

 	try {
         const {data} = await axios.get("https://s3.amazonaws.com/roxiler.com/product_transaction.json");
 		console.log("successfully intialized")
        
 		await Product.bulkCreate(data);
		
     } catch (error) {
        
         console.error("Error fetching data:", error.message);     
         console.error("Error details:", {
             status: error.response?.status,
             headers: error.response?.headers,
             data: error.response?.data,
         });
     }

 })
app.use("/api/v1/product",productRouter);


sequelize.sync({})
.then(result=>{

	app.listen(port,()=>{
		console.log(`server is running at http://localhost:${port}`)
	})
})
.catch((err)=>console.log("ERROR||",err))


