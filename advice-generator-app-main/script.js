"use strict";
const btn = document.querySelector(".advice_btn");
const adviceBox = document.querySelector(".advice_box");
const adviceText = document.querySelector(".advice_text");
const adviceId = document.querySelector(".advice_heading");
let data, id, advice;

const getData = async function () {
  const res = await fetch("https://api.adviceslip.com/advice");
  data = await res.json();
  id = data.slip.id;
  advice = data.slip.advice;

  renderAdvice(id, advice);
};
getData();

const renderAdvice = function (id, advice) {
  adviceId.innerHTML = `Advice #${id}`;
  adviceText.innerHTML = `"${advice}"`;
};

// btn.addEventListener("click", getData);

function debounce(callback, wait) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

btn.addEventListener(
  "click",
  debounce(() => {
    getData();
  }, 1000)
);
