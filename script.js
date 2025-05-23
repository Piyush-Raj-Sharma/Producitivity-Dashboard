const $ = (select) => document.querySelector(select);
const $$ = (select) => document.querySelectorAll(select);

function openFeatures() {
  let allElems = $$(".elem");
  let fullElemPage = $$(".fullElem");
  let fullElemPageBackBtn = $$(".fullElem .back");

  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach(function (back) {
    back.addEventListener("click", function () {
      fullElemPage[back.id].style.display = "none";
    });
  });
}

openFeatures();

let form = $(".addTask form");
let taskInput = $(".addTask form #task-input");
let taskDetailsInput = $(".addTask form textarea");
let taskCheckbox = $(".addTask form #check");

let currentTask = [];

if (localStorage.getItem("currentTask")) {
  currentTask = JSON.parse(localStorage.getItem("currentTask"));
} else {
  console.log("The task list is empty");
}

function renderTask() {
  localStorage.setItem("currentTask", JSON.stringify(currentTask));

  let allTask = $(".allTask");
  let sum = "";

  currentTask.forEach(function (elem, index) {
    sum += `<div class="task">
  <details>
    <summary style="list-style: none; display: flex; align-items: center;">
      <h5 style="margin: 0;">
        ${elem.task}
        <span class="${
          elem.isImp ? "true" : "false"
        }" style="font-size: 12px; background-color: red; color: white; padding: 3px 7px; border-radius: 40px; margin-left: 10px;">imp</span>
      </h5>
    </summary>
    <p style="color: grey; font-size: 16px; margin-top: 15px; padding-left: 10px">${
      elem.details
    }</p>
  </details>
  <button data-id="${index}">Mark as Completed</button>
</div>`;
  });

  allTask.innerHTML = sum;

  // Attach event listeners to newly created buttons
  let markCompletedBtns = $$(".task button");
  markCompletedBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      let index = parseInt(btn.getAttribute("data-id"));
      currentTask.splice(index, 1);
      renderTask(); // Re-render to reflect changes
    });
  });
}

renderTask();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  currentTask.push({
    task: taskInput.value,
    details: taskDetailsInput.value,
    isImp: taskCheckbox.checked,
  });

  renderTask();

  // Clear the form
  taskInput.value = "";
  taskDetailsInput.value = "";
  taskCheckbox.checked = false;
});

// Daily planner

function DailyPlanner() {
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};
  let DayPlanner = $(".day-planner");

  let hours = Array.from({ length: 18 }, (_, idx) => {
    let start = (6 + idx) % 12 || 12;
    let end = (7 + idx) % 12 || 12;
    let suffixStart = 6 + idx < 12 ? "AM" : "PM";
    let suffixEnd = 7 + idx < 12 ? "AM" : "PM";
    return `${start}:00 ${suffixStart} - ${end}:00 ${suffixEnd}`;
  });

  let wholeDaySum = "";
  hours.forEach(function (elem, idx) {
    let savedValue = dayPlanData[idx] || "";
    wholeDaySum += `
    <div class="day-planner-time">
      <p>${elem}</p>
      <input id="${idx}" type="text" placeholder="..." value="${savedValue}">
    </div>`;
  });

  DayPlanner.innerHTML = wholeDaySum;

  let dayPlannerInput = $$(".day-planner input");
  dayPlannerInput.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayPlanData[elem.id] = elem.value;
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });

  $("#clearDayPlanner").addEventListener("click", function () {
    localStorage.removeItem("dayPlanData");
    DailyPlanner(); // re-render with empty inputs
  });
}

DailyPlanner();

// Motivation Quote

function motivationalQuote() {
  let motivationQuoteContent = $(".motivation-2 h1");
  let motivationAuthor = $(".motivation-3 h2");

  async function fetchQuote() {
    const apiUrl = "https://zenquotes.io/api/random";
    const fullUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
      apiUrl
    )}&timestamp=${Date.now()}`; // cache buster

    try {
      const response = await fetch(fullUrl);
      const data = await response.json();
      const parsedContent = JSON.parse(data.contents);

      motivationQuoteContent.innerHTML = parsedContent[0].q;
      motivationAuthor.innerHTML = "- " + parsedContent[0].a;
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  }
  fetchQuote();
}
motivationalQuote();

// Pomodoro Timer

let totalSeconds = 25 * 60;
let timerInterval = null; 

let timer = $(".pomo-timer h1");
let startBtn = $(".pomo-timer .start-timer");
let pauseBtn = $(".pomo-timer .pause-timer");
let resetBtn = $(".pomo-timer .reset-timer");

function updateTimer() {
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);

  timer.innerHTML = `${minutes}:${seconds}`;
}

function startTimer(){
    clearInterval(timerInterval);
    timerInterval = setInterval(function () {
    totalSeconds--;
    updateTimer();
  }, 100);
}

function pauseTimer(){
  clearInterval(timerInterval);
}

function resetTimer(){
  clearInterval(timerInterval);
  totalSeconds = 25 * 60;
  updateTimer();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);
