"use strict";
const overlay = document.querySelector(".overlay");
const selectRewardBtns = document.querySelectorAll(".option_btn");
const closeBtn = document.querySelector(".close_btn");
const backProjectsBtn = document.querySelector(".back-project_btn");
const pledgeBtns = document.querySelectorAll(".pledge_btn");
const successModalBtn = document.querySelector(".modal-success_btn");
const successModal = document.querySelector(".modal-success");
const selectionModal = document.querySelector(".selection-modal");
const standOptions = document.querySelectorAll(".option_select");
const pledgeEls = document.querySelectorAll(".pledge-enter");
const radioInputs = document.querySelectorAll(".input-radio");
const pledgeInputs = document.querySelectorAll(".pledge_input");
const amount = document.querySelector(".amount-backed");
const backers = document.querySelector(".total-backers");
const statBar = document.querySelector(".stats-bar");
const gradeBar = document.querySelector(".grade-bar");
const bambooStands = document.querySelectorAll(".bamboo-stand");
const blackStands = document.querySelectorAll(".black-edition");
const mahoganyStands = document.querySelectorAll(".mahogany-stand");
const mobileQuery = window.matchMedia("(max-width: 26.6em)");
const hero = document.querySelector(".hero-section");
const nav = document.querySelector(".nav");

const openModal = () => {
  selectionModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = () => {
  selectionModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const checkOption = (i) => {
  if (standOptions[i].classList.contains("checked")) {
    pledgeEls[i].classList.remove("hidden");
    radioInputs[i].checked = true;
  }
};

const uncheckOption = () => {
  standOptions.forEach((option) => {
    option.classList.remove("checked");
  });
  pledgeEls.forEach((pledge) => {
    pledge.classList.add("hidden");
  });
  radioInputs.forEach((input) => {
    input.checked = false;
  });
};

//////// Close modal ////////////
closeBtn.addEventListener("click", () => {
  closeModal();
  uncheckOption();
});
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !selectionModal.classList.contains("hidden")) {
    closeModal();
  }
});

//////// Open modal ////////////
backProjectsBtn.addEventListener("click", () => {
  openModal();
});

selectRewardBtns.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    openModal();
    const arr = Array.from(selectRewardBtns);
    const i = arr.indexOf(e.target) + 1;
    standOptions[i].classList.toggle("checked");
    checkOption(i);
  })
);

//////// Toggle options ////////////
standOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (e.target.matches(".option_title") || e.target.matches(".input-radio")) {
      if (option.classList.contains("checked")) {
        option.classList.toggle("checked");
        option.childNodes[1].checked = false;
        option.childNodes[7].classList.toggle("hidden");
      } else {
        standOptions.forEach((option) => {
          option.classList.remove("checked");
          option.childNodes[1].checked = false;
          option.childNodes[7].classList.add("hidden");
        });
        option.classList.add("checked");
        option.childNodes[1].checked = true;
        option.childNodes[7].classList.remove("hidden");
      }
    }
  });
});

//////// Render input values ////////////
standOptions.forEach((option) => {
  option.addEventListener("submit", (e) => {
    e.preventDefault();
    setValues();
    countStands(e.target);
    openSuccesModal();
  });
});

const setValues = () => {
  pledgeInputs.forEach((pledge) => {
    if (!pledge.parentNode.classList.contains("hidden")) {
      const inputSum = parseInt(pledge.value.trim());
      const currentVal = amount.innerHTML.slice(1).split(",").join("");
      const newTotal = (parseInt(currentVal) + inputSum).toLocaleString(
        "en-US"
      );
      amount.innerHTML = `$${newTotal}`;
      pledge.value = "";

      if (pledge.parentNode.classList.contains("no-reward")) {
        amount.innerHTML = `$${parseInt(currentVal).toLocaleString("en-US")}`;
      }

      const currentBackers = backers.innerHTML.split(",").join("");
      const newBackers = (parseInt(currentBackers) + 1).toLocaleString("en-US");
      backers.innerHTML = `${newBackers}`;

      const numberTotal = parseInt(newTotal.split(",").join(""));
      const statWidth = statBar.getBoundingClientRect().width;
      const totalBacked = 100000;
      gradeBar.style.width = `${(numberTotal / totalBacked) * statWidth}px`;
      const gradeWidth = gradeBar.getBoundingClientRect().width;
      if (gradeWidth >= statWidth) {
        gradeBar.style.width = `${statWidth}px`;
      }
    }
  });
};

let countBamboo = 101;
let countBlack = 64;
let countMahogany = 0;
const arrBamboo = Array.from(bambooStands);
const arrBlack = Array.from(blackStands);
const arrMahogany = Array.from(mahoganyStands);
arrBamboo[1].innerHTML = arrBamboo[0].innerHTML = `${countBamboo}`;
arrBlack[1].innerHTML = arrBlack[0].innerHTML = `${countBlack}`;
arrMahogany[1].innerHTML = arrMahogany[0].innerHTML = `${countMahogany}`;

const countStands = (submittedOption) => {
  if (submittedOption.classList.contains("bamboo")) {
    countBamboo--;
    arrBamboo[1].innerHTML = arrBamboo[0].innerHTML = `${
      countBamboo < 0 ? 0 : countBamboo
    }`;
  } else if (submittedOption.classList.contains("black")) {
    countBlack--;
    arrBlack[1].innerHTML = arrBlack[0].innerHTML = `${
      countBlack < 0 ? 0 : countBlack
    }`;
  } else if (submittedOption.classList.contains("mahogany")) {
    countMahogany--;
    arrMahogany[1].innerHTML = arrMahogany[0].innerHTML = `${
      countMahogany < 0 ? 0 : countMahogany
    }`;
  }

  disableOption();
};

const disableModalOption = (option) => {
  option.classList.add("disabled");
  option.classList.remove("checked");
  option.querySelector(".pledge-enter").classList.add("hidden");
  option.querySelector(".input-radio").checked = false;
};

const disableOption = () => {
  if (countBamboo === 0) {
    const bambooOption = document.querySelector(".bambooEl");
    const bambooModal = document.querySelector(".bamboo");
    if (bambooOption) {
      disableModalOption(bambooModal);
      bambooOption.classList.add("disabled");
      const btn = bambooOption.querySelector(".option_btn");
      btn.classList.add("disabled");
      btn.innerHTML = `Out of Stock`;
    }
  }

  if (countBlack === 0) {
    const blackOption = document.querySelector(".blackEl");
    const blackModal = document.querySelector(".black");
    if (blackOption) {
      disableModalOption(blackModal);
      blackOption.classList.add("disabled");
      const btn = blackOption.querySelector(".option_btn");
      btn.classList.add("disabled");
      btn.innerHTML = `Out of Stock`;
    }
  }

  if (countMahogany === 0) {
    const mahoganyOption = document.querySelector(".mahoganyEl");
    const mahoganyModal = document.querySelector(".mahogany");
    if (mahoganyOption) {
      mahoganyOption.classList.add("disabled");
      const btn = mahoganyOption.querySelector(".option_btn");
      btn.classList.add("disabled");
      btn.innerHTML = `Out of Stock`;
      disableModalOption(mahoganyModal);
    }
  }
};
disableOption();

const openSuccesModal = () => {
  closeModal();
  successModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

successModalBtn.addEventListener("click", () => {
  successModal.classList.add("hidden");
  overlay.classList.add("hidden");
  uncheckOption();
});

const navLinks = document.querySelector(".nav-links");
if (mobileQuery.matches) {
  hero.innerHTML = ` <img src="images/image-hero-mobile.jpg" alt="" class="hero-bg" />`;
  let html = ` <button class="hamburger_btn">
  <img class="menu-icon icon" src="images/icon-hamburger.svg" alt="Nav Menu" />
  <img class="close-icon icon" src="images/icon-close-menu.svg" alt="Nav Menu" />
  </button>`;
  nav.insertAdjacentHTML("beforeend", html);

  const navBtn = document.querySelector(".hamburger_btn");
  const menuIcon = document.querySelector(".menu-icon");
  const closeIcon = document.querySelector(".close-icon");
  const icons = document.querySelectorAll(".icon");

  navBtn.addEventListener("click", (e) => {
    if (e.target.matches(".menu-icon")) {
      showMenu();
    } else if (e.target.matches(".close-icon")) {
      closeMenu();
    }
  });

  const showMenu = () => {
    overlay.classList.remove("hidden");
    overlay.style.zIndex = "0";
    overlay.removeEventListener("click", closeModal);
    navLinks.classList.remove("hide-menu");
    navLinks.classList.add("show-menu");
    menuIcon.style.display = "none";
    closeIcon.style.display = "block";
  };

  const closeMenu = () => {
    overlay.classList.add("hidden");
    navLinks.classList.remove("show-menu");
    navLinks.classList.add("hide-menu");
    menuIcon.style.display = "block";
    closeIcon.style.display = "none";
  };
}
