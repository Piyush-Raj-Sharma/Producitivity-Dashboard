const $ = (select) => document.querySelector(select);
const $$ = (select) => document.querySelectorAll(select);

function openFeatures() {
  let allElems = $$(".elem");
  let fullElemPage = $$(".fullElem");
  let fullElemPageBackBtn = $$(".fullElem .back");
  allElems.forEach(function (elem) {
    elem.addEventListener("click", function () {
      // console.log(elem.id);
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

let currentTask = [
  {
    task: "Create Productivity Dashboard",
    details: "Its a dashboard containig TO-DO list",
    isImp: true,
  },
  {
    task: "Create Ye-Wo lang",
    details: "Its a dashboard containig TO-DO list",
    isImp: true,
  },
  {
    task: "Blog Site",
    details: "Its a dashboard containig TO-DO list",
    isImp: false,
  },
];

function renderTask() {
  let allTask = $(".allTask");
  let sum = "";

  currentTask.forEach(function (elem) {
    sum += `<div class="task">
                <h5>${elem.task} <span class = ${elem.isImp}> imp </span></h5>
                <button>Mark as Completed</button>
              </div>`;
  });
  allTask.innerHTML = sum;
}
renderTask();

form.addEventListener("submit", function (e) {
  e.preventDefault();
  currentTask.push({
    task: taskInput.value,
    details: taskDetailsInput.value,
    isImp: taskCheckbox.checked,
  });

  taskInput.value = '';
  taskDetailsInput.value = '';
  taskCheckbox.checked = false;
  renderTask()
});
