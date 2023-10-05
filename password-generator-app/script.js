"use strict";
const lengthInput = document.querySelector(".generator_length--input");
const lengthProgress = document.querySelector(".generator_length--progress");
const passwordLength = document.querySelector(".generator_length--value");
const generatedPassword = document.querySelector(".password-display_result");
const generatorBtn = document.querySelector(".generator_btn");
const copyBtn = document.querySelector(".password-display_copy-btn");
const copyText = document.querySelector(".password-display_copied");
const uppercaseInput = document.querySelector(".uppercase-input");
const lowercaseInput = document.querySelector(".lowercase-input");
const numbersInput = document.querySelector(".numbers-input");
const symbolsInput = document.querySelector(".symbols-input");
const optionInputs = document.querySelectorAll(".generator_options--input");
const strengthLevelText = document.querySelector(".generator_strength--text");
const strengthLevelBoxes = document.querySelectorAll(
  ".generator_strength--level-box"
);
const box1 = document.querySelector(".box-1");
const box2 = document.querySelector(".box-2");
const box3 = document.querySelector(".box-3");
const box4 = document.querySelector(".box-4");
let lengthValue, isCheckedArr;
let optionsCheckedArr = [];
let generatorString = "";
let password = "";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbersChars = "1234567890";
const symbolsChars = "!@#$%^&*()";

optionInputs.forEach((input) => {
  input.addEventListener("input", () => {
    isCheckedArr = [
      uppercaseInput.checked,
      lowercaseInput.checked,
      numbersInput.checked,
      symbolsInput.checked,
    ];
    optionsCheckedArr = isCheckedArr.filter((input) => input === true);
    setStrengthLevel();

    if (input.checked === true) {
      if (input.classList.contains("lowercase-input")) {
        generatorString += lowercaseChars;
      } else if (input.classList.contains("uppercase-input")) {
        generatorString += uppercaseChars;
      } else if (input.classList.contains("numbers-input")) {
        generatorString += numbersChars;
      } else if (input.classList.contains("symbols-input")) {
        generatorString += symbolsChars;
      }
    } else if (input.checked === false) {
      if (input.classList.contains("lowercase-input")) {
        generatorString = generatorString.replace(lowercaseChars, "");
      } else if (input.classList.contains("uppercase-input")) {
        generatorString = generatorString.replace(uppercaseChars, "");
      } else if (input.classList.contains("numbers-input")) {
        generatorString = generatorString.replace(numbersChars, "");
      } else if (input.classList.contains("symbols-input")) {
        generatorString = generatorString.replace(symbolsChars, "");
      }
    }
  });
});

const setProgressValue = () => {
  const min = lengthInput.min;
  const max = lengthInput.max;
  lengthValue = lengthInput.value;

  lengthProgress.style.width = ((lengthValue - min) * 100) / (max - min) + "%";
  passwordLength.innerHTML = lengthValue;
};
setProgressValue();

const removeColors = (box) => {
  box.classList.remove("too-weak");
  box.classList.remove("weak");
  box.classList.remove("medium");
  box.classList.remove("strong");
};

const removeAllBoxes = () => {
  removeColors(box1);
  removeColors(box2);
  removeColors(box3);
  removeColors(box4);
};

const setStrengthLevel = () => {
  if (lengthValue <= 5 || optionsCheckedArr.length === 0) {
    strengthLevelText.innerHTML = "TOO WEAK!";
    removeAllBoxes();
    box1.classList.add("too-weak");
  } else if (
    (lengthValue > 5 && lengthValue <= 10) ||
    optionsCheckedArr.length === 2
  ) {
    strengthLevelText.innerHTML = "WEAK";
    removeAllBoxes();
    box1.classList.add("weak");
    box2.classList.add("weak");
  } else if (
    (lengthValue > 10 && lengthValue <= 15) ||
    optionsCheckedArr.length === 3
  ) {
    strengthLevelText.innerHTML = "MEDIUM";
    removeAllBoxes();
    box1.classList.add("medium");
    box2.classList.add("medium");
    box3.classList.add("medium");
  } else if (lengthValue > 15 && optionsCheckedArr.length === 4) {
    strengthLevelText.innerHTML = "STRONG";
    removeAllBoxes();
    box1.classList.add("strong");
    box2.classList.add("strong");
    box3.classList.add("strong");
    box4.classList.add("strong");
  }
};

lengthInput.addEventListener("input", () => {
  setProgressValue();
  setStrengthLevel();
});

generatorBtn.addEventListener("click", () => {
  if (lengthValue > 0 && optionsCheckedArr.length > 0) {
    password = "";
    for (let i = 0; i <= lengthValue; i++) {
      let randomNumber = Math.floor(Math.random() * generatorString.length);
      password += generatorString.substring(randomNumber, randomNumber + 1);
      console.log(password);
      generatedPassword.innerHTML = password;
    }
  }
  copyText.classList.add("hidden");
});

copyBtn.addEventListener("click", () => {
  let text = generatedPassword.innerHTML;
  navigator.clipboard.writeText(text);
  copyText.classList.remove("hidden");
  console.log("coppied");
});
