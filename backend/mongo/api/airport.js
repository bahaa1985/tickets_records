import mongoose from "mongoose";
import {airportModel} from "../models.js";

export async function getAirports(){
    const airports=airportModel();
    return airports.find();
}

export async function getAirportById(id){
    const airports=airportModel();
    return airports.findById(id);
}

export async function createAirport(airport){
    const airports=airportModel();
    return airports.create(airport);
}

export async function updateAirport(id,airport){
    const airports=airportModel();
    return airports.findByIdAndUpdate(id,airport,{new:true});
}

export async function deleteAirport(id){
    const airports=airportModel();
    return airports.findByIdAndDelete(id);
}   

export async function getAirportByName(name){
    const airports=airportModel();
    return airports.findOne({name:name});
}