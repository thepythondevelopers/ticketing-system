require('dotenv').config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");


//Routes
const calenderRoutes = require("./routes/calender");
const sidebarRoutes = require("./routes/sidebar");
const authRoutes = require("./routes/auth");
const stripeRoutes = require("./routes/stripe");

//Connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}).then(()=>{
    console.log('DATA CONNECTED');
}).catch((err)=>{
    console.log(err);
})

const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use('/api',calenderRoutes);
app.use('/api',sidebarRoutes);
app.use('/api',authRoutes);
app.use('/api',stripeRoutes);

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
});

