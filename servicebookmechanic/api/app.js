const express= require('express');
const app=express();
const morgan=require('morgan');
const userRoutes=require('./Routes/user');
const recordRoutes=require('./Routes/record');
const vehicleRoutes=require('./Routes/vehicle');
const mechanicRoutes=require('./Routes/mechanic');

const bodyParser=require('body-parser');
const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://milangstojkovic:SSn7m58%21@servicebook-lwdm8.mongodb.net/test?retryWrites=true&w=majority', {
    useMongoClient: true
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/users', userRoutes);
app.use('/record', recordRoutes);
app.use('/vehicle', vehicleRoutes);
app.use('/mechanic', mechanicRoutes);

app.use((req, res, next)=> {
    const error=new Error('Not found');
    error.status=404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports=app;