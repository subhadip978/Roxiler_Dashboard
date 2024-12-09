import express from 'express';
import { barChart, statistic,pieChart, transection, getAllChartData } from '../controllers/product.controller.js';
// barChart

const router= express.Router();

router.get("/stats",statistic);
router.get("/barchart",barChart);
router.get("/piechart",pieChart);
router.get("/transection",transection);
router.get("/getall",getAllChartData);

export default router 