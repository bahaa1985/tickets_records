import { companyModel } from "../models.js";
import mongoose from "mongoose";

export async function getCompanies() {  
    const companies = companyModel();
    return companies.find();
}

export async function getCompanyById(id) {
    const companies = companyModel();
    return companies.findById(id);
}

export async function createCompany(company) {
    const companies = companyModel();
    return companies.create(company);
}

export async function updateCompany(id, company) {
    const companies = companyModel();
    return companies.findByIdAndUpdate(id, company, { new: true });
}

export async function deleteCompany(id) {
    const companies = companyModel();
    return companies.findByIdAndDelete(id);
}


