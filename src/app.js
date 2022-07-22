import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'

import productRoute from './routes/product'
import categoryRoute from './routes/category'
import userRoute from './routes/user'
import cartRouter from './routes/cart'

const app = express()

//middleware
app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())

//connecting
// mongodb+srv://anhnv:anhnv123@cluster0.wk5cm.mongodb.net/?retryWrites=true&w=majority
// mongodb://localhost:27017/abc
const dbUrl = 'mongodb+srv://anhnv:anhnv123@cluster0.wk5cm.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(dbUrl)
        .then(() => { console.log("Connect successfully" )})


//routing
app.use("/api", productRoute)
app.use("/api", categoryRoute)
app.use("/api", userRoute)
app.use("/api", cartRouter)

//port
const PORT = 8866;

app.listen(PORT, () => {
    console.log(`Server is running port ${PORT}`)
})