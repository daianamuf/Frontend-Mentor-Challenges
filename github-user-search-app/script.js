"use strict";
import { Octokit, App } from "https://esm.sh/octokit";
const octokit = new Octokit({
  auth: `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`,
});

const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();
console.log("Hello, %s", login);

let userData, dateOfUser;
const options = {
  day: "numeric",
  month: "short",
  year: "numeric",
};
const body = document.body;
const bodyEls = document.querySelectorAll("body *");
const profile = document.querySelector(".profile");
const errorMsg = document.querySelector(".search_error");
const userInput = document.querySelector(".search_bar");
const searchBtn = document.querySelector(".search_btn");
const colorThemeBtn = document.querySelector(".toggle_btn");
const setToLightBtn = document.querySelector(".toggle_btn--light");
const setToDarkBtn = document.querySelector(".toggle_btn--dark");
const lightMedia = window.matchMedia("(prefers-color-scheme: light)");
const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");

const inputUser = async function (userName) {
  try {
    const result = await octokit.request("GET /users/{username}", {
      username: `${userName}`,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    userData = result.data;
    dateOfUser = new Date(userData.created_at).toLocaleDateString(
      "en-GB",
      options
    );

    errorMsg.classList.add("hidden");
    renderUser();
  } catch (error) {
    console.log(error, "Not found");
    errorMsg.classList.remove("hidden");
  }
};
inputUser("octocat");

const renderUser = () => {
  const html = `
  <img src="${userData.avatar_url}" alt="" class="profile_img" />
  
  <div class="profile_username">
    <h2 class="profile_username--heading">${
      userData.name ? userData.name : "Not available"
    }</h2>
    <p class="profile_username--id">@${userData.login}</p>
  </div>
  <p class="profile_joined">Joined ${dateOfUser}</p>
  <p class="profile_bio">
  ${userData.bio ? userData.bio : "This profile has no bio"}
  </p>
  <section class="profile_follow">
    <div class="profile_follow--repos profile_follow--info">
      <p>Repos</p>
      <p>${userData.public_repos}</p>
    </div>

    <div class="profile_follow--followers profile_follow--info">
      <p>Followers</p>
      <p>${userData.followers}</p>
    </div>

    <div class="profile_follow--following profile_follow--info">
      <p>Following</p>
      <p>${userData.following}</p>
    </div>
  </section>

  <section class="profile_info">
    <div class="profile_info--location profile_info--el">
      <img src="assets/icon-location.svg" alt="" />
      <p>${userData.location ? userData.location : "Not Available"}</p>
    </div>

    <div class="profile_info--link profile_info--el">
      <img src="assets/icon-website.svg" alt="" />
      <a href="${userData.blog ? userData.blog : "#"}">${
    userData.blog ? userData.blog : "Not Available"
  }</a>
    </div>

    <div class="profile_info--twitter profile_info--el">
      <img src="assets/icon-twitter.svg" alt="" />
      <p>${
        userData.twitter_username ? userData.twitter_username : "Not Available"
      }</p>
    </div>

    <div class="profile_info--company profile_info--el">
      <img src="assets/icon-company.svg" alt="" />
      <p>${userData.company ? userData.company : "Not Available"}</p>
    </div>
  </section>
`;

  profile.innerHTML = html;
};

const checkUser = (userName) => {
  const userValue = userInput.value;
  if (userValue) {
    inputUser(userValue);
  }
};

function debounce(callback, wait) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

searchBtn.addEventListener(
  "click",
  debounce(() => {
    checkUser();
  }, 1000)
);
userInput.addEventListener(
  "keypress",
  debounce((e) => {
    if (e.key === "Enter") checkUser();
  }, 1000)
);

////////////////////////

const setLightTheme = () => {
  bodyEls.forEach((el) => {
    el.classList.add("light");
  });
  body.classList.add("light");
  setToDarkBtn.classList.remove("hidden");
  setToLightBtn.classList.add("hidden");
};

const setDarkTheme = () => {
  bodyEls.forEach((el) => {
    el.classList.remove("light");
  });
  body.classList.remove("light");
  setToDarkBtn.classList.add("hidden");
  setToLightBtn.classList.remove("hidden");
};

colorThemeBtn.addEventListener("click", () => {
  if (setToDarkBtn.classList.contains("hidden")) {
    setLightTheme();
  } else if (setToLightBtn.classList.contains("hidden")) {
    setDarkTheme();
  }
});

if (lightMedia.matches) {
  setLightTheme();
} else if (darkMedia.matches) {
  setDarkTheme();
}
