"use strict";
let wordData, word, phoneticOptions, source, phoneticText;
let partOfSpeechArr = [];
let definitionsArr = [];
let definitionEl, synonymEl;
let wordPart, meaningsArray;
const body = document.body;
const bodyEls = document.querySelectorAll("body *");
const contentCard = document.querySelector(".content");
const switchInput = document.querySelector(".checkbox-input");
const wrapper = document.querySelector(".wrapper");
const searchBar = document.querySelector(".search-bar");
const searchBarBtn = document.querySelector(".search-bar_btn");
const wordInput = document.querySelector(".search-bar_input");
const searchEmptyError = document.querySelector(".search-bar_error");
const lightMedia = window.matchMedia("(prefers-color-scheme: light)");
const darkMedia = window.matchMedia("(prefers-color-scheme: dark)");

const getWordData = async function (word) {
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    wordData = await res.json();
    console.log(wordData);

    renderWordInfo();
  } catch (error) {
    console.log(error);
    renderErrorMsg();
  }
};

const renderErrorMsg = () => {
  const html = `<div class="error-message">
  <p class="error-message_icon">🫤</p>
  <h3 class="error-message_heading">${wordData.title}</h3>
  <p class="error-message_text">${wordData.message} ${wordData.resolution}</p>
</div>`;

  contentCard.innerHTML = html;
};

const renderWordInfo = () => {
  const html = ` <div class="word">
  <div class="word_heading">
    <h1>${wordData[0].word}</h1>
    <p class="word_heading--phonetics"></p>
    <figure>
    <button class="word_heading--phonetics-btn">
       <img src="starter-code/assets/images/icon-play.svg"  />
  </button>
  <audio class="audio" ></audio>
    </figure>
  </div>

 `;
  contentCard.innerHTML = html;
  const htmlMeaning = ` <div class="word_meaning">
<h3 class="word_meaning--part-of-speech"></h3>
<ul class="word_meaning--list">
  <h4>Meaning</h4>
   </ul>
<div class="word_meaning--synonyms">
  <h4>Synonyms</h4>
</div>
</div>
</div>`;
  wordData.forEach((el) => {
    meaningsArray = el.meanings;
    console.log(meaningsArray);
    meaningsArray.forEach((el) => {
      wordPart = el.partOfSpeech;

      partOfSpeechArr.push(wordPart);
    });
  });

  let unique = partOfSpeechArr.filter((element, index) => {
    return partOfSpeechArr.indexOf(element) === index;
  });

  unique.forEach((part, i) => {
    contentCard.innerHTML += htmlMeaning;
    const wordPartOfSpeech = document.querySelectorAll(
      ".word_meaning--part-of-speech"
    );
    const meaningList = document.querySelectorAll(".word_meaning--list");
    const synonymsList = document.querySelectorAll(".word_meaning--synonyms");
    wordPartOfSpeech[i].innerHTML = unique[i];

    wordData.forEach((el) => {
      const arrMeanings = el.meanings;
      arrMeanings.forEach((el) => {
        if (el.partOfSpeech == part) {
          el.definitions.forEach((definition) => {
            definitionEl = document.createElement("li");
            definitionEl.innerHTML = definition.definition;
            meaningList[i].appendChild(definitionEl);
          });
          el.synonyms.forEach((synonym) => {
            synonymEl = document.createElement("p");
            synonymEl.setAttribute("class", "synonym");
            synonymEl.innerHTML = synonym;
            synonymsList[i].appendChild(synonymEl);
          });
          if (el.synonyms.length === 0) {
            synonymsList[i].classList.add("hidden");
          }
        }
        ////////////????????///////////
        // synonymsList[i].addEventListener("click", (e) => {
        //   if (e.target.classList.contains("synonym"))
        // getWordData(e.target.innerHTML);

        // });
      });
    });
  });

  const sourceUrlHTML = ` <div class="source-url">
  <h4>Source</h4>
  <a target="_blank" href="${wordData[0].sourceUrls[0]}"
    ><p>${wordData[0].sourceUrls[0]}</p>
    <img src="starter-code/assets/images/icon-new-window.svg" 
  /></a>
</div>`;
  contentCard.innerHTML += sourceUrlHTML;

  ////// Word Phonetics and Audio ///////
  const audioBtn = document.querySelector(".word_heading--phonetics-btn");
  const sound = document.querySelector(".audio");
  const phoneticLetters = document.querySelector(".word_heading--phonetics");

  phoneticOptions = wordData[0].phonetics;
  if (phoneticOptions.length === 0) {
    source = document.createElement("source");
    source.setAttribute("src", "");
    sound.appendChild(source);
  } else {
    phoneticOptions.forEach((el) => {
      if (el.audio !== "") {
        source = document.createElement("source");
        source.setAttribute("src", el.audio);
        sound.appendChild(source);
      }
      phoneticText = el.text;
      phoneticLetters.innerHTML = wordData[0].phonetic
        ? wordData[0].phonetic
        : phoneticText
        ? phoneticText
        : "";
    });
  }
  audioBtn.addEventListener("click", () => {
    sound.play();
  });
};

searchBarBtn.addEventListener("click", () => {
  word = wordInput.value.trim();
  if (word === "") {
    searchEmptyError.classList.remove("hidden");
    wordInput.classList.add("error");
  } else {
    searchEmptyError.classList.add("hidden");
    wordInput.classList.remove("error");
    getWordData(word);
  }
});
wordInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    word = wordInput.value.trim();
    if (word === "") {
      searchEmptyError.classList.remove("hidden");
      wordInput.classList.add("error");
    } else {
      searchEmptyError.classList.add("hidden");
      wordInput.classList.remove("error");
      getWordData(word);
    }
  }
});

//////// Font Menu //////////
const fontOptionsBtn = document.querySelector(".options_fonts--current");
const fontOptionsMenu = document.querySelector(".options_fonts--menu");
const currentFont = document.querySelector(".options_fonts--current-text");

fontOptionsBtn.addEventListener("click", (e) => {
  if (fontOptionsMenu.classList.contains("hide-menu")) {
    showMenu();
  } else if (fontOptionsMenu.classList.contains("show-menu")) {
    closeMenu();
  }
});

const showMenu = () => {
  fontOptionsMenu.classList.remove("hide-menu");
  fontOptionsMenu.classList.add("show-menu");
};

const closeMenu = () => {
  fontOptionsMenu.classList.add("hide-menu");
  fontOptionsMenu.classList.remove("show-menu");
};

fontOptionsMenu.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("options_fonts--menu-sansserif")) {
    wrapper.classList.add("sans-serif");
    wrapper.classList.remove("serif");
    wrapper.classList.remove("mono");
  } else if (target.classList.contains("options_fonts--menu-serif")) {
    wrapper.classList.add("serif");
    wrapper.classList.remove("sans-serif");
    wrapper.classList.remove("mono");
  } else if (target.classList.contains("options_fonts--menu-mono")) {
    wrapper.classList.add("mono");
    wrapper.classList.remove("sans-serif");
    wrapper.classList.remove("serif");
  }

  setCurrentOption();

  closeMenu();
});
const fontOptionsArray = Array.from(fontOptionsMenu.children);
const sansSerifOption = fontOptionsArray[0];
const serifOption = fontOptionsArray[1];
const monoOption = fontOptionsArray[2];

const setCurrentOption = () => {
  if (wrapper.classList.contains("sans-serif")) {
    sansSerifOption.classList.add("active-font");
    serifOption.classList.remove("active-font");
    monoOption.classList.remove("active-font");
    currentFont.innerHTML = "Sans Serif";
  } else if (wrapper.classList.contains("serif")) {
    serifOption.classList.add("active-font");
    sansSerifOption.classList.remove("active-font");
    monoOption.classList.remove("active-font");
    currentFont.innerHTML = "Serif";
  } else if (wrapper.classList.contains("mono")) {
    monoOption.classList.add("active-font");
    sansSerifOption.classList.remove("active-font");
    serifOption.classList.remove("active-font");
    currentFont.innerHTML = "Mono";
  }
};
setCurrentOption();

///////// Color theme switch ///////
switchInput.addEventListener("click", (e) => {
  if (e.target.checked === true) {
    setDarkTheme();
  } else if (e.target.checked === false) {
    setLightTheme();
  }

  if (darkMedia.matches && e.target.checked === true) {
    setLightTheme();
  } else if (darkMedia.matches && e.target.checked === false) {
    setDarkTheme();
  }
});

const setDarkTheme = () => {
  bodyEls.forEach((el) => {
    el.classList.add("dark");
  });
  body.classList.add("dark");
};
const setLightTheme = () => {
  bodyEls.forEach((el) => {
    el.classList.remove("dark");
  });
  body.classList.remove("dark");
};

if (lightMedia.matches) {
  setLightTheme();
} else if (darkMedia.matches) {
  setDarkTheme();
}
