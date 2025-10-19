import express from 'express';  
import connect from './mongo/connect.js';
import airport_router from './router/airport_router.js';
import transport_router   from './router/transporter_router.js';
import company_router from './router/company_router.js';
import ticket_router from './router/ticket_router.js';
import login_router from './router/login_router.js';
import user_router from './router/user_router.js';
import finance_router from './router/finance_router.js';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {   
    try {
        const db = await connect(); //connect to mongodb
        if(db){
            res.send('MongoDB connected successfully');
        }
       
    } catch (error) {
        console.log('MongoDB connection failed',error);
    }
});

//routing:
app.use('/airports', airport_router);
app.use('/transporters',transport_router)
app.use('/companies',company_router);
app.use('/tickets',ticket_router);
app.use('/login',login_router);
app.use('/user',user_router);
app.use('/finance',finance_router);
// app.use('./flights',flight_router);

//server port:
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});