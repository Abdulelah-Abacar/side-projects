// Event
let countDownDate = new Date("Dec 31, 2025 23:59:59").getTime();
// console.log(countDownDate)

let counter = setInterval(() => {
  let dateNow = new Date().getTime();

  let diffDate = countDownDate - dateNow;

  // 1000 To Get Second
  // 60 To Get Minute
  // 60 To Get Hour
  // 24 To Get Day
  let days = Math.floor(diffDate / (1000 * 60 * 60 * 24));
  let hours = Math.floor((diffDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diffDate % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diffDate % (1000 * 60)) / 1000);

  document.querySelector(".days").innerHTML = 10 > days ? `0${days}` : days;
  document.querySelector(".hours").innerHTML = 10 > hours ? `0${hours}` : hours;
  document.querySelector(".minutes").innerHTML =
    10 > minutes ? `0${minutes}` : minutes;
  document.querySelector(".seconds").innerHTML =
    10 > seconds ? `0${seconds}` : seconds;

  if (diffDate < 0) {
    clearInterval(counter);
  }
}, 1000);

// Our Skills / Stats

let progressSpan = document.querySelectorAll(".the-progress span");
let ourSkillSection = document.querySelector(".our-skills");

let nums = document.querySelectorAll(".stats .number");
let statsSction = document.querySelector(".stats");
let started = false;

window.onscroll = () => {
  // Skills Animate Width
  if (window.scrollY >= ourSkillSection.offsetTop) {
    progressSpan.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  }
  // Stats Increase Number
  if (window.scrollY >= statsSction.offsetTop) {
    if (!started) {
      nums.forEach((num) => startCount(num));
    }
    started = true;
  }
};
let startCount = (element) => {
  let goal = element.dataset.goal;
};
