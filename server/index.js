import express, { json } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import CONNECTDB from './config/db.js'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
const app=express()
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import websiteRouter from './routes/website.routes.js'
import billingRouter from './routes/billing.routes.js'

const port=process.env.PORT ||5000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"https://websitebuilder-1-71t3.onrender.com",
    credentials:true
}))
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/website",websiteRouter)
app.use("/api/billing",billingRouter)


const startServer = async () => {
  try {
    await CONNECTDB();

    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });

  } catch (err) {
    console.error("MongoDB Connection Failed");
    console.error(err);
  }
};

startServer();
