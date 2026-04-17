import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './routes/authRoute.js'
import mongoose from 'mongoose'
const app = express()
app.use(express.json())
dotenv.config()
app.use(cors())

app.use('/auth',authRouter)
const serverstart=async()=>{
try {
    await mongoose.connect(process.env.MONGO_URI).then(console.log('db connected'))
    app.listen(process.env.PORT,()=>{
    console.log('server running')
})

} catch (error) {
    console.log(error)
}
}
serverstart()
