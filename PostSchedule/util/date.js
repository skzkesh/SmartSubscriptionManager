const getNextBillingDate = (billingCycle, startDate) => {
    const year = parseInt(startDate.slice(0, 4));
    const month = parseInt(startDate.slice(5, 7));
    const day = parseInt(startDate.slice(8, 10));
    
    const normalizedBillingCycle = billingCycle.trim().toLowerCase();
    
    let newYear = year;
    let newMonth = month;
    let newDay = day;

    if (normalizedBillingCycle === "yearly") {
        newYear += 1;
    } 
    else if (normalizedBillingCycle === "monthly") {
        newMonth += 1;
        if (newMonth > 12) {
            newMonth = 1; 
            newYear += 1; 
        }
    } 
    else if (normalizedBillingCycle === "weekly") {
        const date = new Date(year, month - 1, day); 
        date.setDate(date.getDate() + 7);
        newYear = date.getFullYear();
        newMonth = date.getMonth() + 1; 
        newDay = date.getDate();
    }
    
    const formattedMonth = String(newMonth).padStart(2, '0');
    const formattedDay = String(newDay).padStart(2, '0');
    
    const newDate = String(newYear) + "-" + formattedMonth + "-" + formattedDay;
    
    return newDate; 
};

export default {getNextBillingDate};
