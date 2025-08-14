let containerMd = document.createElement("div");
containerMd.className = "container-md";
document.body.appendChild(containerMd);

// Header
let header = document.createElement("div");
header.className = "header";
containerMd.appendChild(header);

let logo = document.createElement("div");
logo.className = "logo";
header.appendChild(logo);

let imgLogo = document.createElement("img");
imgLogo.className = "imgLogo";
imgLogo.src = "./assets/images/logo.svg";
logo.appendChild(imgLogo);

let mode = document.createElement("div");
mode.className = "mode";
header.appendChild(mode);

let modeLogo = document.createElement("img");
modeLogo.className = "modeLogo";
modeLogo.src = "./assets/images/icon-sun.svg";
mode.appendChild(modeLogo);

// List section
let list = document.createElement("div");
list.classList = "list";
containerMd.appendChild(list);

let listInfo = document.createElement("h2");
listInfo.classList = "listInfo";
listInfo.innerHTML = "Extensions List ";
list.appendChild(listInfo);

let listul = document.createElement("ul");
listul.classList = "listul";
listul.innerHTML = `
    <li class="active li">All</li>
    <li class="li">Active</li>
    <li class="li">Inactive</li>
`;
list.appendChild(listul);

let allLis = document.querySelectorAll(".li");

allLis.forEach((li) => {
  li.addEventListener("click", () => {
    allLis.forEach((l) => l.classList.remove("active"));
    li.classList.add("active");
    let type = li.textContent.toLowerCase();
    filterExtensions(type);
  });
});

let extensions;
fetch("./data.json")
  .then((res) => res.json())
  .then((data) => {
    extensions = data;
    displayExtensions(extensions);
  });

let boxSty;
let head;
let boxs = document.createElement("div");
boxs.className = "row g-3";
containerMd.appendChild(boxs);
let isDarkMode = false;

mode.addEventListener("click", function () {
  isDarkMode = !isDarkMode;
  applyMode();
});

function applyMode() {
  if (isDarkMode) {
    modeLogo.src = "./assets/images/icon-moon.svg";
    document.body.style.background =
      "linear-gradient(180deg, #ebf2fc 0%, #eef8f9 100%)";
    header.style.background = "hsl(200, 60%, 99%)";
    mode.style.background = "hsl(0, 0%, 93%)";
    list.style.color = "hsl(227, 75%, 14%)";
    Array.from(boxSty).forEach((box) => {
      box.style.background = "hsl(200, 60%, 99%)";
    });
    Array.from(head).forEach((box) => {
      box.style.color = "hsl(227, 75%, 14%)";
    });
    Array.from(boxs.querySelectorAll(".remove")).forEach((remove) => {
      remove.style.color = "hsl(227, 75%, 14%)";
    });
  } else {
    modeLogo.src = "./assets/images/icon-sun.svg";
    document.body.style.background =
      "linear-gradient(180deg, #040918 0%, #091540 100%)";
    header.style.background = "hsl(226, 25%, 17%)";
    mode.style.background = "hsl(225, 23%, 24%)";
    list.style.color = "hsl(200, 60%, 99%)";
    Array.from(boxSty).forEach((box) => {
      box.style.background = "hsl(226, 25%, 17%)";
    });
    Array.from(head).forEach((box) => {
      box.style.color = "hsl(200, 60%, 99%)";
    });
    Array.from(boxs.querySelectorAll(".remove")).forEach((remove) => {
      remove.style.color = "hsl(200, 60%, 99%)";
    });
  }
}

function displayExtensions(extensionsToShow) {
  boxs.innerHTML = "";
  extensionsToShow.forEach((extension) => {
    let box = document.createElement("div");
    box.className = "box-sty col-md-4 col-sm-6 col-12";
    box.innerHTML = `
      <div class="boxIneer">
        <img src="${extension.logo}" alt="${extension.name}">
        <div class="boxInfo">
          <h2 class="head">${extension.name}</h2>
          <p>${extension.description}</p>
        </div>
      </div>
      <div class="status">
        <button class="remove">remove</button>
        <div class="statu">
          ${getStatusIcon(extension.isActive)}
        </div>
      </div>
    `;
    box.querySelector(".statu").addEventListener("click", () => {
      extension.isActive = !extension.isActive;
      box.querySelector(".statu").innerHTML = getStatusIcon(extension.isActive);
    });
    box.querySelector(".remove").addEventListener("click", () => {
      extensions = extensions.filter((ext) => ext !== extension);
      box.remove();
    });
    boxs.appendChild(box);
  });

  boxSty = document.getElementsByClassName("box-sty");
  head = document.getElementsByClassName("head");
  applyMode();
}

// Function to return the correct SVG
function getStatusIcon(isActive) {
  if (isActive) {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30">
        <path fill="hsl(3, 71%, 56%)" d="M224 128C118 128 32 214 32 320C32 426 118 512 224 512L416 512C522 512 608 426 608 320C608 214 522 128 416 128L224 128zM416 224C469 224 512 267 512 320C512 373 469 416 416 416C363 416 320 373 320 320C320 267 363 224 416 224z"/>
      </svg>
    `;
  } else {
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="30">
        <path fill="#cdcbcb" d="M416 192C486.7 192 544 249.3 544 320C544 390.7 486.7 448 416 448L224 448C153.3 448 96 390.7 96 320C96 249.3 153.3 192 224 192L416 192zM608 320C608 214 522 128 416 128L224 128C118 128 32 214 32 320C32 426 118 512 224 512L416 512C522 512 608 426 608 320zM224 400C268.2 400 304 364.2 304 320C304 275.8 268.2 240 224 240C179.8 240 144 275.8 144 320C144 364.2 179.8 400 224 400z"/>
      </svg>
    `;
  }
}

function filterExtensions(type) {
  let filtered;
  if (type === "all") {
    filtered = extensions;
  } else if (type === "active") {
    filtered = extensions.filter((ext) => ext.isActive);
  } else if (type === "inactive") {
    filtered = extensions.filter((ext) => !ext.isActive);
  }
  displayExtensions(filtered);
}
