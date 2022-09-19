const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// Use this method below to set a hard coded future date!
//let futureDate = new Date(2022, 11, 25, 12, 30, 0, 0);
// console.log(futureDate);
const futureDate = new Date(tempYear,tempMonth,tempDay + 11, 0, 0, 0);
// Setting the date to always be 10 days in the future of when the page is opened to always make sure functionality displays


// Getting the year, hours and minutes is straight-forward
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

// Getting the month returns a 0 based index value which must be linined
// to an accompanying array to make it human readable 
// ie: not month 11 in a 0 based index array, rather December
let month = futureDate.getMonth();
// Checking that the month from JS and the array ar the same
// console.log(months[month]);
month = months[month];
// Get the day of the week by first getting the date and then
// referencing an array of weekdays to match same as month
const date = futureDate.getDate();
// let day = futureDate.getDay();
// day = weekdays[day];
const weekday = weekdays[futureDate.getDay()];


giveaway.textContent = `give-away ends on ${weekday}, ${date} ${month}, ${year} ${hours}:${minutes}`;

// Future time calculated in ms
const futureTime = futureDate.getTime();
// console.log(futureTime);

function getRemainingTime(){
  const today = new Date().getTime();
  // Check the console to make sure the future date is a higher value than the current date
  // console.log(today);
  const t = futureTime - today;
  // Check the console for the difference between current and future time
  // console.log(t);

  // Values in ms
  const oneDay = 24 * 60 * 60 * 1000;
  // console.log(oneDay); 1 day = 86'400'000ms
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  const oneSecond = 1000;

  // Calculate all of the required values
  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / oneSecond);

  // Set values array
  const values = [days, hours, minutes, seconds];

  function format(item){
    if (item < 10) {
      return item = `0${item}`
    }
    return item;
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Sorry, this give-away has expired.</h4>`
  }
};

// Countdown refresher
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();