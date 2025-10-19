import mongoose from "mongoose";
import express from 'express';
import bcrypt from 'bcrypt';
import { userModel  } from "../mongo/models.js";
import { getUsers , getUserById , createUser , updateUser } from "../mongo/api/user.js";

const user_router= express.Router();

user_router.get('/', async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send({'Getting users error :':error.message});
    }
});

user_router.get('/:id', async (req, res)=>{
    const id=req.params.id;
    try{
        const user=await getUserById(id);
        if(user){
            res.status(200).send(user);
        }
    }
    catch(error){
        res.status(500).send({'Getting user by Id error:':error.message});
    }
});

user_router.post('/',express.urlencoded({extended:false}), async (req, res) => {
    try {
        const user = req.body;
        // Hash the password before creating the user
        if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
        const newuser = await createUser(user);
        res.status(200).send(newuser);
    } catch (error) {
        res.status(500).send({'Creating user error:':error.message});
    }
});

user_router.put('/:id', async (req,res)=>{
    const id=req.params.id;
    const user=req.body;
    try{
        // Hash the password if it's included in the update
        if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
        const updateduser=await updateUser(id,user);
        if(updateduser){
            res.status(200).send(updateduser);
        }
    }
    catch(error){
        res.status(500).send({'Updating user error:':error.message});
    }
});

export default user_router;