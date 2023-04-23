"use strict";

const accordionEl = document.querySelector(".accordion");
const questionList = document.querySelectorAll(".question");

questionList.forEach((question) => {
  question.addEventListener("click", function () {
    if (question.parentNode.classList.contains("active")) {
      question.parentNode.classList.toggle("active");
    } else {
      questionList.forEach((question) =>
        question.parentNode.classList.remove("active")
      );
      question.parentNode.classList.add("active");
    }
  });
});
