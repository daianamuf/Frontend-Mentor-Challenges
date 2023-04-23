"use strict";

const grades = document.querySelector(".rating-grades");
const gradeBtns = document.querySelectorAll(".btn");

const ratingState = document.querySelector(".rating-state");
const finalState = document.querySelector(".thank-you-state");
const submitBtn = document.querySelector(".submit-btn");
const currentRatingEl = document.querySelector(".selected-rating");

finalState.classList.add("display-none");

// grades.addEventListener("click", function (e) {
//   const activeBtn = e.target;
//   const grade = activeBtn.innerText;

//   if (activeBtn.matches(".btn")) {
//     // activeBtn.classList.toggle("active");

//     submitBtn.addEventListener("click", function () {
//       ratingState.classList.add("display-none");
//       finalState.classList.remove("display-none");
//       currentRating.innerText = grade;
//     });
//   }
// });

const ratingEl = document.querySelector(".rating-state");

ratingEl.addEventListener("click", (e) => {
  const selectedBtnEl = e.target;
  const selectedValue = selectedBtnEl.innerText;

  if (e.target.matches(".btn")) {
    gradeBtns.forEach((element) => {
      element.classList.remove("active");
    });

    selectedBtnEl.classList.add("active");
    currentRatingEl.innerText = selectedValue;
  }

  if (selectedBtnEl.matches(".submit-btn")) {
    if (selectedValue !== undefined) {
      ratingState.classList.add("display-none");
      finalState.classList.remove("display-none");
    }
  }
});
