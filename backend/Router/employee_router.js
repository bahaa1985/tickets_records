import mongoose from "mongoose";
import express from 'express';
import { employeeModel  } from "../mongo/models.js";
import { getEmployee , getEmployeeById , createEmployee , updateEmployee } from "../mongo/api/employee.js";

const employee_router= express.Router();

employee_router.get('/', async (req, res) => {
    try {
        const employees = await getEmployee();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send({'Getting employees error :':error.message});
    }
});

employee_router.get('/:id', async (req, res)=>{
    const id=req.params.id;
    try{
        const employee=await getEmployeeById(id);
        if(employee){
            res.status(200).send(employee);
        }
    }
    catch(error){
        res.status(500).send({'Getting employee by Id error:':error.message});
    }
});

employee_router.post('/',express.urlencoded({extended:false}), async (req, res) => {
    try {
        const employee = req.body;
        const newEmployee = await createEmployee(employee);
        res.status(200).send(newEmployee);
    } catch (error) {
        res.status(500).send({'Creating employee error:':error.message});
    }
});

employee_router.put('/:id', async (req,res)=>{
    const id=req.params.id;
    const employee=req.body;
    try{
        const updatedEmployee=await updateEmployee(id,employee);
        if(updatedEmployee){
            res.status(200).send(updatedEmployee);
        }
    }
    catch(error){
        res.status(500).send({'Updating employee error:':error.message});
    }
});

export default employee_router;