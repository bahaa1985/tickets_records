import express from 'express';  
import connect from './mongo/connect.js';
import airport_router from './Router/airport_router.js';   
import { companyModel, employeeModel, ticketsModel } from './mongo/models.js';


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
// app.use('/transporters',transport_router)
app.use('/companies',companyModel);
app.use('/employees',employeeModel);
app.use('/tickets',ticketsModel);

//server port:
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});