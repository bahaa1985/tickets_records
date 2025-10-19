import { userModel } from "../models.js";
import mongoose from "mongoose";

export async function getUsers() {
    const users = userModel();
    return users.find();
}

export async function getUserById(id) {
    const users = userModel();
    return users.findById(id);
}

export async function createUser(user) {
    const users = userModel();
    return users.create(user);
}   

export async function updateUser(id, user) {
    const users = userModel();
    return users.findByIdAndUpdate(id, user, { new: true });
}