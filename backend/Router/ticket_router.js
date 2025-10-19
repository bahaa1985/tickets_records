import mongoose from 'express';
import { ticketsModel } from '../mongo/models.js';
import { getTickets, getTicketById, createTicket, updateTicket, deleteTicket } from '../mongo/api/ticket.js';
import express from 'express';

const ticket_router= express.Router();

ticket_router.get('/', async (req, res) => {
    try {
        const tickets = await getTickets();
        res.status(200).send(tickets);
    } catch (error) {
        res.status(500).send({'Getting tickets error :':error.message});
    }
});

ticket_router.get('/:id', async (req, res)=>{
    const id=req.params.id;
    try{
        const ticket=await getTicketById(id);
        if(ticket){
            res.status(200).send(ticket);
        }
    }
    catch(error){
        res.status(500).send({'Getting ticket by Id error:':error.message});
    }
});

ticket_router.post('/',express.urlencoded({extended:false}), async (req, res) => { 
    try {
        const ticket = req.body;
        console.log("ticket router:",ticket);        
        const newTicket = await createTicket(ticket);
        res.status(200).send(newTicket);
    } catch (error) {
        res.status(500).send({'Creating ticket error:':error.message});
    }
});

ticket_router.put('/:id', async (req,res)=>{
    const id=req.params.id;
    const ticket=req.body.ticket;
    try{
        const updatedTicket=await updateTicket(id,ticket);
        if(updatedTicket){
            res.status(200).send(updatedTicket);
        }
    }
    catch(error){
        res.status(500).send({'Updating ticket error:':error.message});
    }   
}); 

ticket_router.delete('/:id',async (req,res)=>{
    const id=req.params.id;
    try{
        const deletedTicket= await deleteTicket(id);
        res.status(200).send(deletedTicket);
    }
    catch(error){
        res.status(500).send({'Deleting ticket error:':error.message});
    }
});


export default ticket_router;