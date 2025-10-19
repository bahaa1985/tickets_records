import mongoose from "mongoose";

export function userModel(){    
    const userSchema=new mongoose.Schema({name:String,mobile:String,userName:String,password:String,privigile:String});
    const users=mongoose.models.users ||  mongoose.model('users', userSchema);
    return  users;
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
        passengers:mongoose.Schema.Types.Array,
        bookingDate:mongoose.Schema.Types.String,
        departureDate:mongoose.Schema.Types.Date,
        returnDate:mongoose.Schema.Types.Date || null,
        flights:mongoose.Schema.Types.Array,
        companyId:mongoose.Types.ObjectId,
        price:mongoose.Schema.Types.Number,
        salePrice:mongoose.Schema.Types.Number,
        payed:mongoose.Schema.Types.Number,
        remain:mongoose.Schema.Types.Number,
        employeeId:mongoose.Types.ObjectId,
        notes:mongoose.Schema.Types.String,
        status: mongoose.Schema.Types.String
    });
    const tickets=mongoose.models.tickets ||  mongoose.model('tickets',TicketSchema);
    return tickets;
}

export function flightModel(){
    const FlightSchema=new mongoose.Schema({
        flightType:String,
        depAirportId:mongoose.Types.ObjectId,
        arrAirportId:mongoose.Types.ObjectId,
        transporterId:mongoose.Types.ObjectId,
    });
    const flights=mongoose.models.flights ||  mongoose.model('flights',FlightSchema);
    return flights;
}
