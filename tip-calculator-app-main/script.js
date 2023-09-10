"use strict";
const calculator = document.querySelector(".calc");
const billInput = document.querySelector(".bill_input");
const peopleInput = document.querySelector(".people_input");
const tipBtns = document.querySelectorAll(".tip_options--btn");
const customBtn = document.querySelector(".custom");
const resultTip = document.querySelector(".result_tip--value");
const resultTotal = document.querySelector(".result_total--value");
const errorMsg = document.querySelector(".people_error");
const resetBtn = document.querySelector(".result_reset-btn");
let tip, total, selectedTip, billValue, peopleValue;

const turnToZero = () => {
  resultTip.innerHTML = `$0.00`;
  resultTotal.innerHTML = `$0.00`;
};
turnToZero();

calculator.addEventListener("click", (e) => {
  const target = e.target;

  tipBtns.forEach((btn) => {
    btn.classList.remove("selected");
    if (target === btn) {
      selectedTip = parseFloat(btn.innerHTML.replace("%", ""));
      console.log(selectedTip);
      btn.classList.add("selected");
      if (selectedTip) {
        calcValues();
      }
    }
  });
  if (target === customBtn) {
    customBtn.addEventListener("input", () => {
      selectedTip = parseFloat(customBtn.value.trim());
      console.log(selectedTip);
      calcValues();
    });
  }

  if (target === billInput) {
    billInput.addEventListener("input", () => {
      billValue = parseFloat(billInput.value);
      if (typeof billValue === "number") {
        calcValues();
      } else {
        turnToZero();
      }
    });
  }

  if (target === peopleInput) {
    peopleInput.addEventListener("input", () => {
      peopleValue = parseFloat(peopleInput.value);
      if (typeof peopleValue === "number") {
        calcValues();
      } else {
        turnToZero();
      }

      if (peopleValue === 0) {
        peopleInput.classList.add("error");
        errorMsg.classList.remove("hidden");
      } else {
        peopleInput.classList.remove("error");
        errorMsg.classList.add("hidden");
      }
    });
  }

  if (target === resetBtn) {
    billInput.value = "";
    peopleInput.value = "";
    customBtn.value = "";
    tipBtns.forEach((btn) => {
      btn.classList.remove("selected");
    });
    turnToZero();
  }
});

const calcValues = () => {
  if (billValue && peopleValue && selectedTip) {
    tip = ((billValue * selectedTip) / 100 / peopleValue).toFixed(2);
    total = (billValue / peopleValue).toFixed(2);
    resultTip.innerHTML = `$${tip}`;
    resultTotal.innerHTML = `$${total}`;
  } else {
    turnToZero();
  }
};
