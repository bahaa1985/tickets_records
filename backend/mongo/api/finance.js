import { ticketsModel } from "../models.js";

export async function getFinanceByMonth(startDate,endDate){
    try{
        const Tickets = ticketsModel();
        const result = await Tickets.aggregate([            
            {
                $match:{
                    bookingDate:{$gte:startDate,$lte:endDate}
                }
            },
            {
                $lookup:{
                    from:"companies",
                    localField:"companyId",
                    foreignField:"_id",
                    as:"Company"
                }
            },  
            {
                $project:{                    
                    passengers:0,
                    flights:0,
                    departureDate:0,
                    returnDate:0,
                    notes:0,
                    status:0,
                    logo:0,
                    mobile:0,
                    email:0                    
                }
            },
            {
                $group:{
                    _id:"$bookingDate",
                    companyName:{$first:"$Company.name"},
                    totalPrice:{$sum:"$price"}
                }
                
            }
            
        ]);
        if (!result || result.length === 0) return "No Data Found";
        return result;
    }
    catch(err){
        console.log(err);        
    }
}
export function groupFinance(){
    try{
        const tickets = ticketsModel();
        tickets.aggregate([
            {
    $sort: { bookingDate: 1, company: 1 } // ensures company order inside groups
  },
            {            
            $group:{
                _id:"$bookingDate",
                tickets:$push("$$ROOT")
            },
            $sort:{_id:-1}
        }])
    }
    catch(err){

    }
}