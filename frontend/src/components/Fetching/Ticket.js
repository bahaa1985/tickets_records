// const getTickets = fetch("/tickets", {
//     method: "GET",
//     headers: {
//         "Content-Type": "application/json"}
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         console.log(data);
//         return data;
//     })
//     .catch((error) => {
//         console.error("Error:", error);
//     });


    export default async function createTicket(passengers, bookingDate, departureDate, returnDate,flightType, flights, transporterId, companyId, price, salePrice, payed, remain, employeeId) {
        const bodyData = {
            'passengers':passengers,
            'bookingDate':bookingDate,
            'departureDate':departureDate,
            'returnDate':returnDate,
            'flightType':flightType,
            'flights':flights,
            'transporterId':transporterId,
            'companyId':companyId,
            'price':price,
            'salePrice':salePrice,
            'payed':payed,
            'remain':remain,
            'employeedId':employeeId
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