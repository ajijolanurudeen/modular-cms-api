const express  = require('express');
const dotenv = require('dotenv').config();
const ConnectDB = require('./DB/connect')
const UserRoutes = require('./routes/userRoute')
const authRoutes = require('./routes/authRoute')
const ProductRoutes = require('./routes/productsRoute')
const ordersRoute = require('./routes/ordersRoute')
const mongoose = require('mongoose')
const app = express();

app.use(express.json());
app.use('/api/user',UserRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/products',ProductRoutes)
app.use('/api/orders',ordersRoute)

const PORT = process.env.PORT||5001

const start = async ()=>{
    try{
        await ConnectDB(process.env.Mongo_URI);
        app.listen(PORT,()=>{console.log(`server started at PORT ${PORT}`)

        })
    }
    catch(error){
        console.log(error)
    }
}

start()