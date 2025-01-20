import mongoose from "mongoose";

export function employeeModel(){    
    const EmployeeSchema=new mongoose.Schema({name:String,mobile:String,userName:String,password:String});
    const employees=mongoose.models.employees ||  mongoose.model('employees',EmployeeSchema);
    return employees;
}

export function privilegseModel(){
    const PrivilegesSchema=new mongoose.Schema({privigileTitle:String});
    const privigiles=mongoose.models.privigiles ||  mongoose.model('privigiles',PrivilegesSchema);
    return privigiles;
}

export function airportModel(){
    const AirportSchema=new mongoose.Schema({city:String,code:String});
    const airports= mongoose.models.airports|| mongoose.model('airports',AirportSchema);
    return airports;
}

export function companyModel(){
    const CompanySchema=new mongoose.Schema({name:String,mobile:String,email:String,logo:String});
    const companies=mongoose.models.companies || mongoose.model('companies',CompanySchema);
    return companies;
}

export function transporterModel(){
    const TransporterSchema=new mongoose.Schema({name:String,logo:String});
    const transporters= mongoose.models.transporters || mongoose.model('transporters',TransporterSchema);
    return transporters;
}

export function ticketsModel(){
    const TicketSchema=new mongoose.Schema({
        clientName:String,
        clientMobile:String,        
        bookingDate:mongoose.Schema.Types.Date,
        departureDate:mongoose.Schema.Types.Date,
        returnDate:mongoose.Schema.Types.Date,
        flights:mongoose.Schema.Types.Array,
        transporterId:String,
        companyId:String,
        price:Number,
        remain:Number,
        employeeId:String,
    });
    const tickets=mongoose.models.tickets ||  mongoose.model('tickets',TicketSchema);
    return tickets;
}

export function flightModel(){
    const FlightSchema=new mongoose.Schema({
        flightType:String,
        depAirportId:String,
        arrAirportId:String,
        transporterId:String,
    });
    const flights=mongoose.models.flights ||  mongoose.model('flights',FlightSchema);
    return flights;
}
