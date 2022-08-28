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
const dragRoutes = require("./routes/drag");
const userRoutes = require("./routes/user");
const packageRoutes = require("./routes/package");
const menuDropdownRoutes = require("./routes/menuDropdown");
const locationRoutes = require("./routes/location");
const categoryRoutes = require("./routes/category");
const documentManagementRoutes = require("./routes/documentManagement");
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

app.use(express.static('uploads')); 
app.use('/uploads', express.static('uploads'));
app.use(express.static('uploads/location')); 
app.use('/uploads/location', express.static('uploads/location'));
app.use(express.static('uploads/documents')); 
app.use('/uploads/documents', express.static('uploads/documents'));
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.use('/api',calenderRoutes);
app.use('/api',sidebarRoutes);
app.use('/api',authRoutes);
app.use('/api',stripeRoutes);
app.use('/api',dragRoutes);
app.use('/api',userRoutes);
app.use('/api',packageRoutes);
app.use('/api',menuDropdownRoutes);
app.use('/api',locationRoutes);
app.use('/api',categoryRoutes);
app.use('/api',documentManagementRoutes);

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
});

