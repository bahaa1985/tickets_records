export async function getTickets (){
    const response = await fetch('/tickets',{
        method:'GET',
        headers:{
            'Content-Type':'application/json',
            'Accept': '*/*'
        }
    });

    return response.json()    
} 


export default async function createTicket(passengers, bookingDate, departureDate, returnDate, flights, 
    companyId, price, salePrice, payed, remain, employeeId, notes) {
    const bodyData = {
        'passengers':passengers,
        'bookingDate':bookingDate,
        'departureDate':departureDate,
        'returnDate':returnDate,
        'flights':flights,
        'companyId':companyId,
        'price':price,
        'salePrice':salePrice,
        'payed':payed,
        'remain':remain,
        'employeedId':employeeId,
        'notes':notes
    };
    
    const response= await fetch('/tickets',{
    method:'POST',
    headers:{
        'Content-Type':'application/json',
        'Accept': '*/*'
    },
    body:JSON.stringify(bodyData)
});

return response.json()

}

export const updateTicket = async (id,ticket) =>{
    const bodyData={
        'ticket' : ticket
    }
    const response = await fetch(`/tickets/${id}`,{
        method:'PUT',
        headers:{
        'Content-Type':'application/json',
        'Accept': '*/*'
    },
    body:JSON.stringify(bodyData)
    })
    return response.json();
}