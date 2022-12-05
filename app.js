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
const plancategoryRoutes = require("./routes/planCategory");
const planRoutes = require("./routes/plan");
const officerRoutes = require("./routes/officer");
const formRoutes = require("./routes/form");
const evacuationRoutes = require("./routes/evacuation");
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
app.use(express.static('uploads/plan')); 
app.use('/uploads/plan', express.static('uploads/plan'));
app.use(express.static('uploads/sidebar')); 
app.use('/uploads/sidebar', express.static('uploads/sidebar'));
app.use(express.static('uploads/calender')); 
app.use('/uploads/calender', express.static('uploads/calender'));
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
app.use('/api',plancategoryRoutes);
app.use('/api',planRoutes);
app.use('/api',officerRoutes);
app.use('/api',formRoutes);
app.use('/api',evacuationRoutes);

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
});

