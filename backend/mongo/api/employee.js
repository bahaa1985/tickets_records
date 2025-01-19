import { employeeModel } from "../models";
import mongoose from "mongoose";

export async function getEmployees() {
    const employees = employeeModel();
    return employees.find();
}

export async function getEmployeeById(id) {
    const employees = employeeModel();
    return employees.findById(id);
}

export async function createEmployee(employee) {
    const employees = employeeModel();
    return employees.create(employee);
}   

export async function updateEmployee(id, employee) {
    const employees = employeeModel();
    return employees.findByIdAndUpdate(id, employee, { new: true });
}