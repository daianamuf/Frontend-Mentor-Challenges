"use strict";

const form = document.querySelector(".form");
const firstName = document.querySelector(".first_name");
const lastName = document.querySelector(".last_name");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const submitBtn = document.querySelector(".submit-btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  checkInputs();
});

const checkInputs = function () {
  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  if (firstNameValue === "") {
    setErrorFor(firstName);
  } else {
    setValidFor(firstName);
  }

  if (lastNameValue === "") {
    setErrorFor(lastName);
  } else {
    setValidFor(lastName);
  }

  if (passwordValue === "") {
    setErrorFor(password);
  } else {
    setValidFor(password);
  }

  if (!checkEmail(emailValue) && emailValue === "") {
    setErrorFor(email);
  } else {
    setValidFor(email);
  }
};

const setErrorFor = function (input) {
  const inputEl = input.parentElement;
  inputEl.classList.add("error");
};

const setValidFor = function (input) {
  const inputEl = input.parentElement;
  inputEl.classList.add("valid");
  inputEl.classList.remove("error");
};

const checkEmail = function (email) {
  const validRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
};
