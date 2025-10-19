export async function financeData(satrtDate,endDate){
    const response = await fetch (`/finance?startDate=${satrtDate}&endDate=${endDate}`,
        {
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                Accept:"*/*",
            }
        });
        return response;
}