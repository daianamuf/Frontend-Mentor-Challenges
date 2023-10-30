"use strict";

const challenges = [
  { name: "3-column-preview-card-component", type: "vanilla" },
  { name: "four-card-feature-section", type: "vanilla" },
  { name: "order-summary-component", type: "vanilla" },
  { name: "single-price-grid-component", type: "vanilla" },
  { name: "social-proof-section", type: "vanilla" },
  { name: "skilled-elearning-landing-page", type: "vanilla" },
  { name: "fylo-data-storage-component-master", type: "vanilla" },
  {
    name: "huddle-landing-page-with-single-introductory-section-master",
    type: "vanilla",
  },
  { name: "chat-app-css-illustration-master", type: "vanilla" },
  { name: "interactive-rating-component-main", type: "vanilla" },
  { name: "faq-accordion-card-main", type: "vanilla" },
  { name: "intro-component-with-signup-form-master", type: "vanilla" },
  { name: "expenses-chart-component-main", type: "vanilla" },
  { name: "advice-generator-app-main", type: "vanilla" },
  { name: "crowdfunding-product-page-main", type: "vanilla" },
  { name: "tip-calculator-app-main", type: "vanilla" },
  { name: "github-user-search-app", type: "vanilla" },
  { name: "dictionary-web-app", type: "vanilla" },
  { name: "password-generator-app", type: "vanilla" },
  { name: "job-filter", type: "react" },
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

  if (challenge.type === "vanilla") {
    link.href = `./${challenge.name}/index.html`;
  } else if (challenge.type === "react") {
    link.href = `./${challenge.name}/dist/index.html`;
  }

  link.innerText = challenge.name;

  img.src = `${challenge.name}/design/desktop-design.jpg`;

  link.append(img);
  listItem.appendChild(link);
  challengesList.appendChild(listItem);
});
