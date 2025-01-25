import { transporterModel } from "../models.js";
import mongoose from "mongoose";

export async function getTransporters() {
    const transporters = transporterModel();
    return transporters.find();
}

export async function getTransporterById(id) {
    const transporters = transporterModel();
    return transporters.findById(id);
}

export async function createTransporter(transporter) {
    const transporters = transporterModel();
    return transporters.create(transporter);
}

export async function updateTransporter(id, transporter) {
    const transporters = transporterModel();
    return transporters.findByIdAndUpdate(id, transporter, { new: true });
}

export async function deleteTransporter(id) {
    const transporters = transporterModel();
    return transporters.findByIdAndDelete(id);
}

export async function getTransporterByName(name) {
    const transporters = transporterModel();
    return transporters.findOne({ name: name });    
}


