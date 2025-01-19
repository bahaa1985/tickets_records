import { flightModel } from "../models";
import mongoose from "mongoose";

export async function getFlights() {
    const flights = flightModel();
    return flights.find();
}

export async function getFlightById(id) {
    const flights = flightModel();
    return flights.findById(id);
}

export async function createFlight(flight) {
    const flights = flightModel();
    return flights.create(flight);
}

export async function updateFlight(id, flight) {
    const flights = flightModel();
    return flights.findByIdAndUpdate(id, flight, { new: true });
}

export async function deleteFlight(id) {
    const flights = flightModel();
    return flights.findByIdAndDelete(id);
}