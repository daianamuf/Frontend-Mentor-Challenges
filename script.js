"use strict";

const challenges = [
  "3-column-preview-card-component",
  "four-card-feature-section",
  "order-summary-component",
  "single-price-grid-component",
  "social-proof-section",
  "skilled-elearning-landing-page",
  "fylo-data-storage-component-master",
  "huddle-landing-page-with-single-introductory-section-master",
  "chat-app-css-illustration-master",
];

const challengesList = document.querySelector(".challenges__list");

challenges.forEach((challenge) => {
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  const img = document.createElement("img");

  link.href = `./${challenge}/index.html`;
  link.innerText = challenge;

  img.src = `${challenge}/design/desktop-design.jpg`;

  link.append(img);
  listItem.appendChild(link);
  challengesList.appendChild(listItem);
});
