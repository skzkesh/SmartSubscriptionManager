const getNextBillingDate = (billingCycle, startDate, today) => {
    const normalizeDate = (dateStr) => new Date(dateStr + 'T00:00:00');

    let currentDate = normalizeDate(startDate);
    const todayDate = normalizeDate(today);

    while (currentDate < todayDate) {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth(); // 0-indexed
        const day = currentDate.getDate();

        if (billingCycle === "yearly") {
            currentDate = new Date(year + 1, month, day);
        } else if (billingCycle === "monthly") {
            currentDate = new Date(year, month + 1, day);
        } else if (billingCycle === "weekly") {
            currentDate.setDate(currentDate.getDate() + 7);
        } else {
            break;
        }
    }

    const yyyy = currentDate.getFullYear();
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0'); // getMonth is 0-indexed
    const dd = String(currentDate.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
};


// Calculates total spend per subscription up to 'today'
const getTotalEachSubscription = (amount, billingCycle, startDateStr, todayStr) => {
    let total = 0;
    let currentDate = new Date(startDateStr);
    const today = new Date(todayStr);

    while (currentDate <= today) {
        total += amount;
        currentDate = getNextBillingDate(billingCycle, currentDate);
    }

    return total;
};

module.exports = { getNextBillingDate, getTotalEachSubscription };
