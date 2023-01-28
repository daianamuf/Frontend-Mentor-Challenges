"use strict";

const challenges = [
  "3-column-preview-card-component",
  "four-card-feature-section",
  "order-summary-component",
  "single-price-grid-component",
  "social-proof-section",
  "skilled-elearning-landing-page",
];

const challengesList = document.querySelector(".challenges__list");

challenges.forEach((challenge) => {
  const listItem = document.createElement("li");
  const link = document.createElement("a");

  link.href = `./${challenge}/index.html`;
  link.innerText = challenge;

  listItem.appendChild(link);
  challengesList.appendChild(listItem);
});
