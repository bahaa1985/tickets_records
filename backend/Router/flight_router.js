import mongoose from "mongoose";
import { flightModel } from "../models";
import { getFlights , getFlightById , createFlight , updateFlight , deleteFlight } from "../mongo/api/flight";
import express from 'express';

const flight_router= express.Router();

flight_router.get('/', async (req, res) => {
    try {
        const flights = await getFlights();
        res.status(200).send(flights);
    } catch (error) {
        res.status(500).send({'Getting flights error :':error.message});
    }
});

flight_router.get('/:id', async (req, res)=>{
    const id=req.params.id;
    try{
        const flight=await getFlightById(id);
        if(flight){
            res.status(200).send(flight);
        }
    }
    catch(error){
        res.status(500).send({'Getting flight by Id error:':error.message});
    }
});

flight_router.post('/',express.urlencoded({extended:false}), async (req, res) => { 
    try {
        const flight = req.body;
        const newFlight = await createFlight(flight);
        res.status(200).send(newFlight);
    } catch (error) {
        res.status(500).send({'Creating flight error:':error.message});
    }
}); 

flight_router.put('/:id', async (req,res)=>{
    const id=req.params.id;
    const flight=req.body;
    try{
        const updatedFlight=await updateFlight(id,flight);
        if(updatedFlight){
            res.status(200).send(updatedFlight);
        }
    }
    catch(error){
        res.status(500).send({'Updating flight error:':error.message});
    }   
}); 

flight_router.delete('/:id',async (req,res)=>{
    const id=req.params.id;
    try{
        const deletedFlight= await deleteFlight(id);
        res.status(200).send(deletedFlight);
    }
    catch(error){
        res.status(500).send({'Deleting flight error:':error.message});
    }
}); 


export default flight_router;
