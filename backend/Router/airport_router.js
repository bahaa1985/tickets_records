import express from 'express';
import { createAirport,deleteAirport,getAirportById,getAirports } from '../mongo/api/airport.js';
import bodyParser from 'body-parser';

const app=express();

const airport_router = express.Router();

airport_router.get('/', async (req, res) => {
    try {
        const airports = await getAirports();
        res.status(200).send(airports);
    } catch (error) {
        res.status(500).send({'Get Airports:':error.message});
    }
});

airport_router.get('/:id', async (req, res)=>{
    const id=req.params.id;
    try{
        const airports=await getAirportById(id);
        if(airports){
            res.status(200).send(airports);
        }
    }
    catch(error){
        res.status(500).send({'Get Airport by Id:':error.message});
    }
})

airport_router.post('/',bodyParser.urlencoded({extended:false}), async (req, res) => { 
    try {
        const airport = req.body;
        const newAirport = await createAirport(airport);
        res.status(200).send(newAirport);
    } catch (error) {
        res.status(500).send({'Create Airport:':error.message});
    }
});

airport_router.put('/:id', async (req,res)=>{
    const id=req.params.id;
    try{
        const airport=await updateAirport(id,req.body);
        if(airport){
            res.status(200).send(airport);
        }
    }
    catch(error){
        res.status(500).send({'Update Airport:':error.message});
    }   
});

airport_router.delete('/:id',async (req,res)=>{
    const id=req.params.id;
    try{
        const deletedAirport= await deleteAirport(id);
        res.status(200).send(deletedAirport);
    }
    catch(error){
        res.status(500).send({'Delete Airport:':error.message});
    }
});

export default airport_router;