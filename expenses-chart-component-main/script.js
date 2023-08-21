"use strict";
const days = document.querySelectorAll(".day-chart");
const daysContainer = document.querySelector(".spending__days");

let data;
let minValue;
let maxValue;

const getJsonData = async function () {
  const res = await fetch("./data.json");
  data = await res.json();
  // data = data.sort(function (a, b) {
  //   return a.amount - b.amount;
  // });
  data = data.sort((a, b) => -1);

  minValue = data.reduce((acc, curr) => acc + curr.amount, 0);
  maxValue = 0;
  data.forEach((el) => {
    if (el.amount < minValue) {
      minValue = el.amount;
    }

    if (el.amount > maxValue) {
      maxValue = el.amount;
    }
  });

  renderDays();
};
getJsonData();

const renderDays = function () {
  data.forEach((dayEl) => {
    const heightValue = Math.abs(dayEl.amount / minValue);
    const heightStyle = heightValue * 35;

    let chartHTML = `<div class="day-chart ${dayEl.day}">
    
    <div class="chart-el ${dayEl.day} ${
      maxValue === dayEl.amount ? "max" : ""
    }" style="height:${heightStyle}px" >
    <div class="value-el">$${dayEl.amount}</div></div>
    <p class="day">${dayEl.day}</p>
  </div>`;

    daysContainer.insertAdjacentHTML("afterbegin", chartHTML);
  });
};
