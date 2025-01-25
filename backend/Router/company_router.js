import mongoose from "mongoose";
import {companyModel} from "../mongo/models.js";
import express from 'express';
import bodyParser from 'body-parser';
import { createCompany, deleteCompany, getCompanyById, updateCompany } from "../mongo/api/company.js";

const company_router=express.Router();

company_router.get('/',async (req,res)=>{
    try{
        const companies = await companyModel().find();
        res.status(200).send(companies);
    }
    catch(error){
        res.status(500).send("Get Companies error:",error);
    }
})

company_router.get('/:id', async (req, res)=>{
    const id=req.params.id;
    try{
        const airports=await getCompanyById(id);
        if(airports){
            res.status(200).send(airports);
        }
    }
    catch(error){
        res.status(500).send({'Get company by Id error:':error.message});
    }
})

company_router.post('/',bodyParser.urlencoded({extended:false}), async (req, res)=>{
    const company=req.body;
    try{
        const newCompany=await createCompany(company);
        if(newCompany){
            res.status(200).send(newCompany);
        }
    }
    catch(error){
        res.status(500).send({'Creating new company error:':error.message});
    }
})

company_router.put('/:id',bodyParser.urlencoded({extended:false}), async (req, res)=>{
    const id=req.params.id;
    const company=req.body;
    try{
        const updatedCompany=await updateCompany(id,company);
        if(updatedCompany){
            res.status(200).send(updatedCompany);
        }
    }
    catch(error){
        res.status(500).send({'Updating company error:':error.message});
    }
})

company_router.delete('/:id',async (req,res)=>{
    const id=req.params.id;
    try{
        const deletedCompany= await deleteCompany(id);
        res.status(200).send(deletedCompany);
    }
    catch(error){
        res.status(500).send({'Deleting company error:':error.message});
    }
})

export default company_router;