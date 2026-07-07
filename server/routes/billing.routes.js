import express from 'express'
import { billing, verifyPayment } from '../controllers/billing.controller.js'
import isAuth from '../middlewares/isAuth.js'


const billingRouter=express.Router()

billingRouter.post("/",isAuth,billing)
billingRouter.post("/verify-payment", isAuth, verifyPayment);

export default billingRouter