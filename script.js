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
