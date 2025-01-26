import express from 'express';
import { getTransporters, getTransporterById, createTransporter, updateTransporter, deleteTransporter } from '../mongo/api/transporter.js';
import bodyParser from 'body-parser';

const transporter_router = express.Router();

transporter_router.get('/', async (req, res) => {
    try {
        const transporters = await getTransporters();
        res.status(200).send(transporters);
    } catch (error) {
        res.status(500).send({'Getting transporters error :':error.message});
    }
});

transporter_router.get('/:id', async (req, res)=>{
    const id=req.params.id;
    try{
        const transporter=await getTransporterById(id);
        if(transporter){
            res.status(200).send(transporter);
        }
    }
    catch(error){
        res.status(500).send({'Getting transporter by Id error:':error.message});
    }
})

transporter_router.post('/',bodyParser.urlencoded({extended:false}), async (req, res) => { 
    try {
        const transporter = req.body;
        const newTransporter = await createTransporter(transporter);
        res.status(200).send(newTransporter);
    } catch (error) {
        res.status(500).send({'Creating transporter error:':error.message});
    }
});

transporter_router.put('/:id', async (req,res)=>{
    const id=req.params.id;
    const transporter=req.body;
    try{
        const updatedTransporter=await updateTransporter(id,transporter);
        if(updatedTransporter){
            res.status(200).send(updatedTransporter);
        }
    }
    catch(error){
        res.status(500).send({'Updating transporter error:':error.message});
    }   
});

transporter_router.delete('/:id',async (req,res)=>{
    const id=req.params.id;
    try{
        const deletedTransporter= await deleteTransporter(id);
        res.status(200).send(deletedTransporter);
    }
    catch(error){
        res.status(500).send({'Deleting transporter error:':error.message});
    }
});

export default transporter_router;