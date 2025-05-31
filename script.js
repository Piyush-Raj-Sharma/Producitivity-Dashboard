let cards = document.querySelectorAll(".card");
let section = document.querySelectorAll("section");
let main = document.querySelector("main");
let backBtn = document.querySelectorAll(".section-upper button");

cards.forEach((card, idx) => {
  card.addEventListener("click", () => {
    section[idx].style.display = "block";
    main.style.display = "none";
  });
});

backBtn.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    section[idx].style.display = "none";
    main.style.display = "block";
  });
});

function DateAndTime() {
  let dateText = document.querySelector(".weather-right h1");
  let timeText = document.querySelector(".weather-right h2");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let date = new Date();
  let todayDate = date.getDate();
  let month = months[date.getMonth() + 1];
  let year = date.getFullYear();
  dateText.innerHTML = `${todayDate} ${month} , ${year}`;

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  function TimeCheck(hour) {
    if (hour >= 12) {
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart("2", 0)} PM`;
    } else if (hour < 24) {
      if (hour == 24)
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
          2,
          "0"
        )}:${String(seconds).padStart("2", 0)} AM`;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart("2", 0)} AM`;
    }
  }
  let day = daysOfWeek[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  timeText.innerHTML = `${day} , ${TimeCheck(hours)}`;
}

setInterval(DateAndTime, 1000);

function TodoList() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let taskInput = document.querySelector(".todo-left input");
  let descriptionInput = document.querySelector(".todo-left textarea");
  let checkedInput = document.querySelector(".todo-left #checkbox");
  let createTaskBtn = document.querySelector(".todo-left button");
  let todoRight = document.querySelector(".todo-right");
  let todoPopup = document.querySelector(".todo-edit-popup");
  let todoPopupInput = document.querySelector(".todo-edit-popup input");
  let todoPopupTextarea = document.querySelector(".todo-edit-popup textarea");
  let updateTaskBtn = document.querySelector(".todo-edit-popup button");
  let todoError = document.querySelector(".todo-error");

  function displayTask() {
    if (tasks.length == 0) {
      todoRight.innerHTML = "<p>There is no Task</p>";
      return;
    }
    let sum = "";

    tasks.forEach((el, index) => {
      sum =
        sum +
        `<div class="list" data-index="${index}">
     <h5 class="imp ${el.isImp}">Imp</h5>
    <div class="list-upper">
    <h4>${el.taskName}</h4>
    <div class="list-right">
    <i class="fa-solid fa-pencil"></i>
    <i class="fa-solid fa-trash"></i>
    <i class="fa-solid fa-chevron-down"></i>
    </div>
    </div>
    <div class="list-lower">
     <p>${el.description}</p>
    </div>
    </div>`;
    });
    todoRight.innerHTML = sum;
  }
  displayTask();

  function AddTask() {
    if (taskInput.value.trim() == "") {
      todoError.innerHTML = "Please enter your task name";
      return;
    }
    todoError.innerHTML = "";
    let yourTask = {
      taskName: taskInput.value.trim(),
      description: descriptionInput.value.trim(),
      isImp: checkedInput.checked,
    };
    tasks.unshift(yourTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    descriptionInput.value = "";
    checkedInput.checked = false;
    displayTask();
  }

  createTaskBtn.addEventListener("click", AddTask);

  todoRight.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-trash")) {
      const parent = e.target.closest(".list");
      const index = parseInt(parent.getAttribute("data-index"));
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTask();
    }
  });

  todoRight.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-chevron-down")) {
      const parent = e.target.closest(".list");
      const lowerDiv = parent.querySelector(".list-lower");
      lowerDiv.classList.toggle("list-lower-open");
    }
  });

  let currentEditIndex = null;

  todoRight.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-pencil")) {
      const parent = e.target.closest(".list");
      const idx = parent.getAttribute("data-index");
      currentEditIndex = idx;
      todoPopup.style.top = "50%";
      todoPopup.style.left = "50%";
      todoPopupInput.value = tasks[idx].taskName;
      todoPopupTextarea.value = tasks[idx].description;
    }
  });

  updateTaskBtn.addEventListener("click", () => {
    tasks[currentEditIndex].taskName = todoPopupInput.value.trim();
    tasks[currentEditIndex].description = todoPopupTextarea.value.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    todoPopup.style.top = "-500%";
    displayTask();
  });

  todoPopup.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("cut-round") ||
      e.target.classList.contains("cut-icon")
    ) {
      todoPopup.style.top = "-500%";
    }
  });
}

TodoList();

function motivationFunc() {
  let motivationContent = document.querySelector(".motivation-content h5");
  let motivationContentAuthor = document.querySelector(".motivation-content p");

  async function fetchQuotes() {
  try {
    let response = await fetch("https://quoteslate.vercel.app/api/quotes/random");
    let data = await response.json();
    motivationContent.innerHTML = data.quote;
    motivationContentAuthor.innerHTML = `-${data.author}`;
  } catch (err) {
    motivationContent.innerHTML = "Stay positive and keep going!";
    motivationContentAuthor.innerHTML = "- Unknown";
    console.error("Quote fetch failed:", err);
  }
}
  fetchQuotes();
}

motivationFunc();

function StickyNotes() {
  let stickyNotesContainer = document.querySelector(".sticky-notes-container");
  let notesDescription = document.querySelector(".create-notes-popup textarea");
  let colorsBtn = document.querySelectorAll(".colors button");
  let createNotesBtn = document.querySelector(".sticky-notes .create-notes");
  let pasteTaskBtn = document.querySelector(".paste-task-btn");
  let notesPopup = document.querySelector(".create-notes-popup");
  let stickyError = document.querySelector(".sticky-error");
  let colorError = document.querySelector(".color-error");

  let selectedColor = "";
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  function animateNotes() {
    const notes = document.querySelectorAll(".notes");
    notes.forEach((note) => {
      gsap.to(note, {
        y: 8,
        rotation: 1.5,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: Math.random() * 1.5,
      });
    });
  }

  createNotesBtn.addEventListener("click", () => {
    notesPopup.style.top = "50%";
    notesPopup.style.left = "50%";
  });

  notesPopup.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("cut-icon") ||
      e.target.classList.contains("cut-round")
    ) {
      notesPopup.style.top = "-500%";
    }
  });

  colorsBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      colorsBtn.forEach((b) => (b.style.border = "none"));
      btn.style.border = "3px solid green";
      selectedColor = btn.value;
    });
  });

  function displayNotes() {
    if (notes.length == 0) {
      stickyNotesContainer.innerHTML = "<p>No Notes yet</p>";
      return;
    }

    let sum = "";
    notes.forEach((el, idx) => {
      sum += `
        <div class="notes" data-id="${idx}" style="background-color: ${el.bgColor}">
          <div class="hanger">
            <div class="pin"></div>
            <div class="pin"></div>
          </div>
          <h3>${el.content}</h3>
          <div class="notes-lower">
            <p>${el.notesDate}</p>
            <div class="round"><i class="fa-solid fa-trash"></i></div>
          </div>
        </div>
      `;
    });

    stickyNotesContainer.innerHTML = sum;
    animateNotes();
  }

  displayNotes();

  function addNotes() {
    if (notesDescription.value.trim() == "") {
      stickyError.innerHTML = "Please enter your notes content";
      return;
    }
    stickyError.innerHTML = "";
    if (selectedColor == "") {
      colorError.innerHTML = "Please Select color";
      return;
    }
    colorError.innerHTML = "";

    let date = new Date();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let todayDate = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();

    let YourNotes = {
      content: notesDescription.value.trim(),
      bgColor: selectedColor,
      notesDate: `${month} ${todayDate}, ${year}`,
    };

    notes.unshift(YourNotes);
    localStorage.setItem("notes", JSON.stringify(notes));
    notesDescription.value = "";
    displayNotes();
    animateNotes();
  }

  pasteTaskBtn.addEventListener("click", () => {
    addNotes();
    notesPopup.style.top = "-500%";
  });

  stickyNotesContainer.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("round") ||
      e.target.classList.contains("fa-trash")
    ) {
      const parent = e.target.closest(".notes");
      let index = parseInt(parent.getAttribute("data-id"));
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      displayNotes();
    }
  });
}

StickyNotes();

function timerFunc() {
  let timerInput = document.querySelector(".timer-input input");
  let timerBtn = document.querySelector(".timer-input button");
  let timerContent = document.querySelector(".timer-content h1");
  let startBtn = document.querySelector(".timer-buttons .start");
  let pauseBtn = document.querySelector(".timer-buttons .pause");
  let resetBtn = document.querySelector(".timer-buttons .reset");
  let clockSound = document.querySelector(".tick-tick");
  let timesUpSound = document.querySelector(".timesup");
  let timerText = document.querySelector(".timer-content h5");
  let progressBar = document.querySelector(".progress-bar .bar");
  let timerError = document.querySelector(".timer-err");

  let totalSeconds = 0;
  let interval = null;
  let originalSeconds = 0;

  timerBtn.addEventListener("click", () => {
    if (interval != null) return;
    if (timerInput.value == "") {
      timerError.innerHTML = "Please enter time in minutes";
      return;
    }
    timerError.innerHTML = "";
    if (isNaN(timerInput.value)) {
      timerError.innerHTML = "Please enter a valid time";
      return;
    }
    timerError.innerHTML = "";
    totalSeconds = parseInt(timerInput.value) * 60;
    originalSeconds = totalSeconds;
    updateTimer();
    startBtn.disabled = false;
    progressBar.style.width = "0%";
  });

  function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    timerContent.innerHTML = `${String(minutes).padStart("2", 0)} : ${String(
      seconds
    ).padStart("2", 0)}`;
  }

  function startTimer() {
    if (interval != null || totalSeconds <= 0) return;
    timerBtn.disabled = true;
    timerInput.disabled = true;
    startBtn.disabled = true;
    timerText.innerHTML = "Working Time";
    timerText.style.color = "green";

    interval = setInterval(() => {
      if (totalSeconds > 0) {
        clockSound.play();
        totalSeconds--;
        progressBar.style.width = `${
          100 - (totalSeconds / originalSeconds) * 100
        }%`;
        progressBar.style.backgroundColor = "green";
        updateTimer();
      } else {
        clearInterval(interval);
        interval = null;
        clockSound.pause();
        timesUpSound.play();
        timerText.innerHTML = "Your Time is over";
        timerText.style.color = "red";
        startBtn.disabled = false;
        clockSound.currentTime = 0;
        timerBtn.disabled = false;
        timerInput.disabled = false;
        progressBar.style.width = "100%";
        progressBar.style.backgroundColor = "red";
        setTimeout(() => {
          timerText.innerHTML = "Let's Start";
          timerText.style.color = "var(--tri3)";
          progressBar.style.width = "0%";
        }, 2000);
      }
    }, 1000);
    function pauseTimer() {
      if (interval !== null) {
        clearInterval(interval);
        timerText.innerHTML = "BreakTime";
        timerText.style.color = "yellow";
        interval = null;
        clockSound.pause();
        startBtn.disabled = false;
        progressBar.style.backgroundColor = "yellow";
      }
    }
    pauseBtn.addEventListener("click", pauseTimer);
  }

  function resetFunc() {
    clearInterval(interval);
    interval = null;
    totalSeconds = 0;
    timerText.innerHTML = "Let's Start";
    timerText.style.color = "var(--tri3)";
    timerContent.innerHTML = "00 : 00";
    timerInput.value = "";
    startBtn.disabled = false;
    timerBtn.disabled = false;
    timerInput.disabled = false;
    clockSound.pause();
    clockSound.currentTime = 0;
    timesUpSound.currentTime = 0;
    progressBar.style.width = "0%";
  }

  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetFunc);
}

timerFunc();

function dailyPlanner() {
  let dailyPlannerContainer = document.querySelector(
    ".daily-planner-container"
  );
  let arr = new Array(18);
  let sum = "";
  function checkTime(time) {
    if (time <= 12) {
      time = `${time} AM`;
      return time;
    } else if (time > 12) {
      if (time == 24) return `${time} AM`;
      time = `${time} PM`;
      return time;
    }
  }
  arr.fill(0).forEach((el, idx) => {
    sum =
      sum +
      `
    <div class="daily-list" data-id="${idx}">
    <h3>${checkTime(idx + 6)} - ${checkTime(idx + 7)}</h3>
    <input type="text"  placeholder="Enter Your Routine Based on Time" data-id="${idx}">
    </div>
    `;
  });
  dailyPlannerContainer.innerHTML = sum;

  let plan = JSON.parse(localStorage.getItem("plan")) || [];

  let dailyPlanInput = document.querySelectorAll(".daily-list input");
  dailyPlanInput.forEach((el) => {
    let index = el.getAttribute("data-id");
    el.value = plan[index] || "";

    el.addEventListener("input", () => {
      plan[index] = el.value;
      localStorage.setItem("plan", JSON.stringify(plan));
    });
  });
}
dailyPlanner();

// Dev - info

document.querySelector(".dev-info").addEventListener("click", () => {
  const existing = document.querySelector(".dev-info-overlay");
  if (existing) existing.remove();

  // Prevent scrolling
  document.body.style.overflow = "hidden";

  const overlay = document.createElement("div");
  overlay.classList.add("dev-info-overlay");

  // Overlay styles
  Object.assign(overlay.style, {
    position: "fixed",
    inset: "0",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "99999",
  });

  const popup = document.createElement("div");
  popup.classList.add("dev-info-popup");

  // Popup styles
  Object.assign(popup.style, {
    background: "rgba(1, 44, 44, 0.8)",
    border: "2px solid #00ffff",
    padding: "40px 50px",
    borderRadius: "20px",
    boxShadow: "0 0 30px #00ffff",
    textAlign: "center",
    color: "#fff",
    maxWidth: "500px",
    width: "90%",
    fontFamily: "'Orbitron', sans-serif",
    position: "relative",
    opacity: "0",
    transform: "translateY(-20px)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
  });

  popup.innerHTML = `
    <img src="Assets/piyush-ghibli.png" alt="Piyush Raj" />
    <h2>Piyush Raj</h2>
    <p>Web Developer | JavaScript & MERN Enthusiast</p>
    <div class="dev-social-links">
      <a href="https://github.com/Piyush-Raj-Sharma" target="_blank" aria-label="GitHub">
        <img src="Assets/github.png" alt="GitHub" />
      </a>
      <a href="https://instagram.com/Piyush-Raj-Sharma" target="_blank" aria-label="Instagram">
        <img src="Assets/instagram.png" alt="Instagram" />
      </a>
      <a href="https://linkedin.com/in/piyush-raj-sharma" target="_blank" aria-label="LinkedIn">
        <img src="Assets/linkedin.png" alt="LinkedIn" />
      </a>
    </div>
    <button class="close-dev-info" aria-label="Close Developer Info">Close</button>
  `;

  // Style elements inside popup

  const img = popup.querySelector("img[alt='Piyush Raj']");
  Object.assign(img.style, {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "50%",
    boxShadow: "0 0 15px #00ffff",
    marginBottom: "20px",
    transition: "transform 0.3s ease",
    cursor: "default",
  });
  img.addEventListener("mouseenter", () => (img.style.transform = "scale(1.05)"));
  img.addEventListener("mouseleave", () => (img.style.transform = "scale(1)"));

  const h2 = popup.querySelector("h2");
  Object.assign(h2.style, {
    fontSize: "28px",
    margin: "10px 0",
    letterSpacing: "1.5px",
  });

  const p = popup.querySelector("p");
  Object.assign(p.style, {
    fontSize: "16px",
    marginBottom: "25px",
    fontWeight: "500",
    color: "#a0f7f7",
  });

  const socialLinks = popup.querySelector(".dev-social-links");
  Object.assign(socialLinks.style, {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "30px",
  });

  socialLinks.querySelectorAll("a img").forEach((icon) => {
    Object.assign(icon.style, {
      width: "35px",
      filter: "drop-shadow(0 0 3px #00ffff)",
      transition: "transform 0.3s ease, filter 0.3s ease",
      cursor: "pointer",
    });
    icon.parentElement.addEventListener("mouseenter", () => {
      icon.style.transform = "scale(1.2)";
      icon.style.filter = "drop-shadow(0 0 6px #00ffff)";
    });
    icon.parentElement.addEventListener("mouseleave", () => {
      icon.style.transform = "scale(1)";
      icon.style.filter = "drop-shadow(0 0 3px #00ffff)";
    });
  });

  const closeBtn = popup.querySelector(".close-dev-info");
  Object.assign(closeBtn.style, {
    padding: "10px 25px",
    fontSize: "16px",
    backgroundColor: "#00ffff",
    border: "none",
    borderRadius: "12px",
    color: "#000",
    cursor: "pointer",
    boxShadow: "0 0 15px #00ffff",
    transition: "background-color 0.3s ease, color 0.3s ease",
  });
  closeBtn.addEventListener("mouseenter", () => {
    closeBtn.style.backgroundColor = "#00cccc";
    closeBtn.style.color = "#fff";
  });
  closeBtn.addEventListener("mouseleave", () => {
    closeBtn.style.backgroundColor = "#00ffff";
    closeBtn.style.color = "#000";
  });

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  // Trigger fade-in animation
  requestAnimationFrame(() => {
    popup.style.opacity = "1";
    popup.style.transform = "translateY(0)";
  });

  closeBtn.addEventListener("click", () => {
    // Fade out effect
    popup.style.opacity = "0";
    popup.style.transform = "translateY(-20px)";
    setTimeout(() => {
      overlay.remove();
      document.body.style.overflow = ""; // Re-enable scrolling
    }, 300);
  });
});

function weatherFunc() {
  const cityInput = document.querySelector(".location input");
  let cityName = document.querySelector(".weather-right .city-name");
  let temp = document.querySelector(".temperature h1");
  let weatherType = document.querySelector(".temperature h5");
  let feels = document.querySelector(".weather-description .feels");
  let humidity = document.querySelector(".weather-description .humidity");
  let wind = document.querySelector(".weather-description .wind");

  const savedCity = JSON.parse(localStorage.getItem("city")) || "";
  cityInput.value = savedCity;

  async function fetchWeather(city) {
    try {
      const apikey = "652301b322e54f7693661608251205";
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`
      );
      const data = await response.json();
      cityName.innerHTML = `${data.location.name} (${data.location.region}) , ${data.location.country}`;
      temp.innerHTML = `${data.current.temp_c}°C`;
      weatherType.innerHTML = `${data.current.condition.text}`;
      feels.innerHTML = `Feels like :${data.current.feelslike_c}°C`;
      humidity.innerHTML = `Humidity : ${data.current.humidity}%`;
      wind.innerHTML = `Wind : ${data.current.wind_kph}km/h`;
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  }

  async function getCityFromIP() {
    const response = await fetch("https://ipapi.co/json/");
    const data = await response.json();
    return data.city;
  }

  async function initWeather() {
    let city = savedCity;

    if (!city) {
      city = await getCityFromIP();
      localStorage.setItem("city", JSON.stringify(city));
      cityInput.value = city;
    }

    fetchWeather(city);
  }

  let debounceTimer;
  cityInput.addEventListener("input", (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const newCity = e.target.value.trim();
      if (newCity) {
        localStorage.setItem("city", JSON.stringify(newCity));
        fetchWeather(newCity);
      }
    }, 2000);
  });

  initWeather();
}

weatherFunc();

function videoChange() {
  const videoUrls = [
    "./assets/vid1.mp4",
    "./assets/vid2.mp4",
    "./assets/vid3.mp4",
    "./assets/vid4.mp4",
    "./assets/vid5.mp4",
    "./assets/vid6.mp4",
    "./assets/vid7.mp4",
    "./assets/vid8.mp4",
    "./assets/vid9.mp4",
    "./assets/vid10.mp4",
    "./assets/vid11.mp4",
    "./assets/vid12.mp4",
  ];

  let currentIndex = 0;
  const videoElement = document.querySelector(".background-video");
  videoElement.src = videoUrls[currentIndex];
  videoElement.load();
  videoElement.play();

  setInterval(() => {
    gsap.to(videoElement, {
      opacity: 0,
      duration: 1.5,
      onComplete: () => {
        currentIndex = (currentIndex + 1) % videoUrls.length;
        videoElement.src = videoUrls[currentIndex];
        videoElement.load();
        videoElement.play();

        gsap.to(videoElement, {
          opacity: 1,
          duration: 1.5,
        });
      },
    });
  }, 10000);
}

videoChange();

function themeChange() {
  const themes = [
    {
      "--primary-color": "#181c14",
      "--secondary-color": "#3c3d37",
      "--tri1": "#697565",
      "--tri2": "#ecdfcc",
    },
    {
      "--primary-color": "#222831",
      "--secondary-color": "#393E46",
      "--tri1": "#948979",
      "--tri2": "#DFD0B8",
    },
    {
      "--primary-color": "#1A3636",
      "--secondary-color": "#40534C",
      "--tri1": "#677D6A",
      "--tri2": "#D6BD98",
    },
  ];

  let currentTheme = 0;
  window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme != null) {
      currentTheme = parseInt(savedTheme);
    }
    applyTheme(currentTheme);
  });

  function applyTheme(index) {
    const root = document.documentElement;
    const theme = themes[index];

    Object.keys(theme).forEach((key) => {
      root.style.setProperty(key, theme[key]);
    });
    localStorage.setItem("selectedTheme", index);
  }

  document.querySelector(".theme-btn").addEventListener("click", () => {
    currentTheme = (currentTheme + 1) % themes.length;
    applyTheme(currentTheme);
  });
}

themeChange();

gsap.to("nav", {
  duration: 1.2,
  opacity : 1,
  y: 0,
  ease: "power4.out",
  delay : 0.5
});

let weatherSection = document.querySelector(".weather-section")

gsap.to(".weather-section",{
  duration:1.2,
  opacity : 1,
  y:0,
  ease: "power4.out",
  delay: 1.5

})
