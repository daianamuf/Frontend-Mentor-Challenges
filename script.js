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
  "interactive-rating-component-main",
  "faq-accordion-card-main",
  "intro-component-with-signup-form-master",
  "expenses-chart-component-main",
  "advice-generator-app-main",
  "crowdfunding-product-page-main",
  "tip-calculator-app-main",
  "github-user-search-app",
  "dictionary-web-app",
  "password-generator-app",
];

const challengesList = document.querySelector(".challenges__list");
const listOfElements = document.querySelectorAll("li");

// To be used in the future.
const isMobile = () => {
  if (
    navigator.userAgent.match("/Android/i") ||
    navigator.userAgent.match("/Iphone/i")
  ) {
    return true;
  } else {
    return false;
  }
};

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
