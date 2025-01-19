import { ticketsModel } from "../models";
import mongoose from "mongoose";

export async function getTickets() {
    const tickets = ticketsModel();
    return tickets.find();
}

export async function getTicketById(id) {
    const tickets = ticketsModel();
    return tickets.findById(id);
}

export async function createTicket(ticket) {
    const tickets = ticketsModel();
    return tickets.create(ticket);
}

export async function updateTicket(id, ticket) {
    const tickets = ticketsModel();
    return tickets.findByIdAndUpdate(id, ticket, { new: true });
}

export async function deleteTicket(id) {
    const tickets = ticketsModel();
    return tickets.findByIdAndDelete(id);
}
