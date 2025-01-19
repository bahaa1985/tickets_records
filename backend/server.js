import express from 'express';  
import connect from './mongo/connect.js';
import airport_router from './router/airport_router.js';
import transport_router   from './router/transporter_router.js';
import company_router from './router/company_router.js';
import ticket_router from './router/ticket_router.js';

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
// app.use('/employees',employeeModel);
app.use('/tickets',ticket_router);

//server port:
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});