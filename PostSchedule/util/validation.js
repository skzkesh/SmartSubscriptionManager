const validateEmail = (email) => {
  return String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

const validateDate = (date) => {
const year = parseInt(date.slice(0, 4));
const month = parseInt(date.slice(5, 7));
const day = parseInt(date.slice(8, 10));

if (year > 2025){
  return false;
}
if (month < 1 || month > 12){
  return false;
}

const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

if (isLeapYear(year)) {
  daysInMonth[1] = 29; 
}

if (day < 1 || day > daysInMonth[month - 1]) {
  return false;
}

return true;
}

const isLeapYear = (year) => {
return (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
}

const validateBillingCycle = (billingCycle) => {
return (billingCycle === "yearly" || billingCycle === "monthly" || billingCycle === "weekly" )
}

export default {validateEmail, validateDate, validateBillingCycle};