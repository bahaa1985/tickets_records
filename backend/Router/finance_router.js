import mongoose from "mongoose";
import { getFinanceByMonth } from "../mongo/api/finance.js";
import express from 'express';

const finance_router  = express.Router();

finance_router.get('/', async (req, res) => {
    const startDate=req.query.startDate;
    const endDate=req.query.endDate;
    try {
        const finance = await getFinanceByMonth(new Date(startDate),new Date(endDate));
        res.status(200).send(finance);
    } catch (error) {
        res.status(500).send({'Getting finance error :':error.message});
    }
});

export default finance_router;