const firebaseConfig = {
  apiKey: "AIzaSyDKvkJQPofED1QI2uu9r8vnu0xC2ANOAZM",
  authDomain: "memorycards-game.firebaseapp.com",
  databaseURL: "https://memorycards-game-default-rtdb.firebaseio.com",
  projectId: "memorycards-game",
  storageBucket: "memorycards-game.appspot.com",
  messagingSenderId: "816819449029",
  appId: "1:816819449029:web:ec90495ab669ba2d6f14ac"
};
firebase.initializeApp(firebaseConfig);

let database = firebase.database();
let nickname;
// Detección del Estado del Usuario (login o no)
firebase.auth().onAuthStateChanged(function(user) {
  if (!user) {
    window.location.href = "https://memorycards-game.web.app/login";
  } else {
    let user = firebase.auth().currentUser;
    database.ref("Users/" + user.uid).once("value")
      .then(function(snapshot) {
        nickname = snapshot.child("/Nickname").val();
      }
    );
  }
});

// Cerrar sesión
const signOut = () => {
  firebase.auth().signOut().then(function() {
    window.location.href = "https://memorycards-game.web.app/login";
  }).catch(function(error) {
    alert(error);
  });
}
const buttonSignOut = document.querySelector(".button-signout");
buttonSignOut.addEventListener("click", signOut);

// Configuration Buttons:
const buttonCategoryDevelopers = document.querySelector(".category-developers");
const buttonCategoryCountries = document.querySelector(".category-countries");
const buttonCategoryAnimals = document.querySelector(".category-animals");
const buttonDifficultyEasy = document.querySelector(".difficulty-easy");
const buttonDifficultyNormal = document.querySelector(".difficulty-normal");
const buttonDifficultyHard = document.querySelector(".difficulty-hard");

// Buttons Change Sections:
const buttonRanking = document.querySelector(".button-ranking");
const buttonRankingPlayAgain = document.querySelector(".ranking > .button-play-again");
const buttonTutorial = document.querySelector(".button-tutorial");
const buttonTutorialBack = document.querySelector(".tutorial > .button-back-top");
const buttonDifficultyBack = document.querySelector(".configuration > .button-back-top");
const buttonReset = document.querySelector(".button-reset");
const buttonPlayAgain = document.querySelector(".congratulation .button-play-again");

// Sections:
const configurationSection = document.querySelector(".configuration");
const cardsSection = document.querySelector(".cards");
const tutorialSection = document.querySelector(".tutorial");
const rankingSection = document.querySelector(".ranking");

// Timer Variables:
let minuteTenContainer = document.querySelector(".minute-ten");
let minuteUnitContainer = document.querySelector(".minute-unit");
let secondTenContainer = document.querySelector(".second-ten");
let secondUnitContainer = document.querySelector(".second-unit");
let timerID;
let timeValue;
let time;

// Ranking Selectors
const categorySelector = document.getElementById("ranking_category");
const difficultySelector = document.getElementById("ranking_difficulty");

// Cards Images:
animalsImg = [
  "images/card_images/animals/bird.svg",
  "images/card_images/animals/butterfly.svg",
  "images/card_images/animals/chiken.svg",
  "images/card_images/animals/cow.svg",
  "images/card_images/animals/crab.svg",
  "images/card_images/animals/dolphin.svg",
  "images/card_images/animals/elephant.svg",
  "images/card_images/animals/flamingo.svg",
  "images/card_images/animals/fox.svg",
  "images/card_images/animals/giraffe.svg",
  "images/card_images/animals/horse.svg",
  "images/card_images/animals/koala.svg",
  "images/card_images/animals/lion.svg",
  "images/card_images/animals/monkey.svg",
  "images/card_images/animals/pig.svg",
  "images/card_images/animals/whale.svg",
]
countriesImg = [
  "images/card_images/countries/argentina.svg",
  "images/card_images/countries/brazil.svg",
  "images/card_images/countries/canada.svg",
  "images/card_images/countries/china.svg",
  "images/card_images/countries/france.svg",
  "images/card_images/countries/germany.svg",
  "images/card_images/countries/india.svg",
  "images/card_images/countries/italy.svg",
  "images/card_images/countries/jamaica.svg",
  "images/card_images/countries/japan.svg",
  "images/card_images/countries/portugal.svg",
  "images/card_images/countries/rusia.svg",
  "images/card_images/countries/south-africa.svg",
  "images/card_images/countries/spain.svg",
  "images/card_images/countries/uk.svg",
  "images/card_images/countries/usa.svg"
]
developersImg = [
  "images/card_images/developers/angular.svg",
  "images/card_images/developers/bootstrap.svg",
  "images/card_images/developers/css.svg",
  "images/card_images/developers/firebase.svg",
  "images/card_images/developers/go.svg",
  "images/card_images/developers/graphql.svg",
  "images/card_images/developers/html.svg",
  "images/card_images/developers/java.svg",
  "images/card_images/developers/js.svg",
  "images/card_images/developers/nodejs.svg",
  "images/card_images/developers/php.svg",
  "images/card_images/developers/python.svg",
  "images/card_images/developers/react.svg",
  "images/card_images/developers/sass.svg",
  "images/card_images/developers/svelte.svg",
  "images/card_images/developers/vue.svg"
]

// Interface Items:
const categoryItemsContainer = document.querySelectorAll(".category");
const difficultyItemsContainer = document.querySelectorAll(".difficulty");
const cardsContainer = document.querySelector(".cards_container");
const cardsNodeList = document.querySelectorAll(".card");
const cardsImagesContainerItems = document.querySelectorAll(".card_img_container");
const cardsImagesItems = document.querySelectorAll(".card_img");
const errorsCounter = document.querySelector(".errors_counter");
const congratulation = document.querySelector(".congratulation");
const congratulationErrors = document.querySelector(".congratulation_errors");
const congratulationTime = document.querySelector(".congratulation_time");

let categoryItems = [];
let difficultyItems = [];
let cards = [];
let cardsImagesContainer = [];
let cardsImages = [];

//Convertion NodeListElements to Arrays:
const toArray = (nodelist, array) => {
  for (let i = 0; i < nodelist.length; i++) {
    array[i] = nodelist[i];
  }
}

toArray(categoryItemsContainer, categoryItems);
toArray(difficultyItemsContainer, difficultyItems);
toArray(cardsNodeList, cards);
toArray(cardsImagesContainerItems, cardsImagesContainer);
toArray(cardsImagesItems, cardsImages);

//Game Configuration and Initialization:
let category;
let difficulty;
const setCategory = (categorySelected) => {
  category = categorySelected;
  categorySelector.value = category;
  dissolveItems(categoryItems, difficultyItems);
}
const setDifficulty = (difficultySelected) => {
  difficulty = difficultySelected;
  difficultySelector.value = difficulty;
  showRanking();
  dissolveSection(configurationSection, cardsSection);
  setGameConfiguration();
}
const setGameConfiguration = () => {
  if(difficulty == "Easy"){
    cardsContainer.classList.add(`cards_container-easy`);
  }
  if(difficulty == "Normal"){
    cardsContainer.classList.add(`cards_container-normal`);
  }
  if(difficulty == "Hard"){
    cardsContainer.classList.add(`cards_container-hard`);
  }
  showCards();
  setImagesCards();
  setTimeout(function(){
    Cronometro();
  }, 2000);
}

let randomCards;
const showCards = () => {
  let quantity;
  if(difficulty == "Easy"){
    quantity = 12;
    randomCards = [0,1,2,3,4,5,6,7,8,9,10,11];
  }
  if(difficulty == "Normal"){
    quantity = 16;
    randomCards = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  }
  if(difficulty == "Hard"){
    quantity = 24;
    randomCards = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
  }
  for(let i = 0; i < quantity; i++){
    cards[i].classList.remove("hidden");
  }
}
const setImagesCards = () => {
  let x = 0;
  let images;
  let randomImages = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  if(category == "Developers"){
    images = developersImg;
  }
  if(category == "Countries"){
    images = countriesImg;
  }
  if(category == "Animals"){
    images = animalsImg;
  }
  randomCards = randomCards.sort(function() {return Math.random() - 0.5});
  randomCards = randomCards.sort(function() {return Math.random() - 0.5});
  randomImages = randomImages.sort(function() {return Math.random() - 0.5});
  for (let key = 0; key < randomCards.length; key += 2) {
    cardsImages[randomCards[key]].setAttribute("src", images[randomImages[x]]);
    cardsImages[randomCards[key + 1]].setAttribute("src", images[randomImages[x]]);
    x++;
  }
}

let cardsFlipped = [];
let cardsImagesContainerFlipped = [];
let cardsImagesFlipped = [];
let cardsFlippedCounter = 0;
let correctCards = [];
let currentErrors = 0;
const flipCards = (key) => {
  cardsFlipped[cardsFlippedCounter] = cards[key];
  cardsImagesContainerFlipped[cardsFlippedCounter] = cardsImagesContainer[key];
  cardsImagesFlipped[cardsFlippedCounter ]= cardsImages[key];
  cardsFlippedCounter++;
  cards[key].animate([
    {transform: "rotateY(0deg) scale(1.05)", boxShadow: "0 0 30px #f8f9fa7e"},
    {transform: "rotateY(180deg) scale(1.05)", boxShadow: "0 0 30px #f8f9fa7e"}
  ],{
    duration: 250,
    fill: "forwards"
  });
  cards[key].disabled = true;
  if(cardsFlippedCounter == 2){
    compareCards(key);
    cardsFlippedCounter = 0;
  }
}
const unFlipCards = (array) => {
  for (const key in array) {
    array[key].animate([
      {transform: "rotateY(180deg) scale(1.05)", boxShadow: "0 0 30px #f8f9fa7e"},
      {transform: "rotateY(0deg) scale(1)", boxShadow: "none"}
    ],{
      duration: 250,
      fill: "forwards"
    });
  }
}
const compareCards = () => {
  stateButtonCards(true);
  let image_1 = cardsImagesFlipped[0].getAttribute("src");
  let image_2 = cardsImagesFlipped[1].getAttribute("src");
  if(image_1 == image_2){
    matchCards();
  } else {
    unmatchCards();
  }
}
const matchCards = () => {
  for (const key in cardsImagesContainerFlipped) {
    cardsImagesContainerFlipped[key].animate([
      {backgroundColor: "#F8F9FA"},
      {backgroundColor: "#54e346"},
      {backgroundColor: "#54e346"},
      {backgroundColor: "#F8F9FA"},
    ],{
      duration: 1000,
    });
  }
  correctCards.push(cardsFlipped[0], cardsFlipped[1]);
  setTimeout(function(){
    stateButtonCards(false);
    if(correctCards.length == randomCards.length){
      Congratulation();
    }
  }, 1000);
}
const unmatchCards = () => {
  for (const key in cardsImagesContainerFlipped) {
    cardsImagesContainerFlipped[key].animate([
      {backgroundColor: "#F8F9FA"},
      {backgroundColor: "#fd2e2e"},
      {backgroundColor: "#F8F9FA"},
    ],{
      duration: 1000
    });
  }
  setTimeout(function(){
    unFlipCards(cardsFlipped);
    stateButtonCards(false);
    currentErrors++;
    errorsCounter.innerHTML = `${currentErrors}`;
  }, 1000);
}
const stateButtonCards = (state) => {
  for (const key in cards) {
    cards[key].disabled = state;
  }
  for (const key in correctCards){
    correctCards[key].disabled = true;
  }
  buttonReset.disabled = state;
}
const Congratulation = () => {
  congratulation.classList.remove("hidden");
  congratulationErrors.innerHTML = currentErrors;
  congratulationTime.innerHTML = time;
  setRanking();
}

const Reset = () => {
  unFlipCards(cardsFlipped);
  unFlipCards(correctCards);
  setTimeout(function(){
    cardsContainer.animate([
      {opacity: 1, transform: "translateZ(0px)"},
      {opacity: 0, transform: "translateZ(-20px)"},
      {opacity: 1, transform: "translateZ(0px)"},
    ],{
      duration: 600
    });
    currentErrors = 0;
    errorsCounter.innerHTML = `${currentErrors}`;
    correctCards = [];
    cardsFlipped = [];
    cardsImagesContainerFlipped = [];
    cardsImagesFlipped = [];
    cardsFlippedCounter = 0;
    Cronometro();
    setImagesCards();
    stateButtonCards(false);
  },300);
}
const PlayAgain = () => {
  unFlipCards(correctCards);
  currentErrors = 0;
  errorsCounter.innerHTML = `${currentErrors}`;
  correctCards = [];
  cardsImagesContainerFlipped = [];
  cardsImagesFlipped = [];
  stateButtonCards(false);
}

const setRanking = () => {
  let nicknameExistents = [];
  let errorsExistents = [];
  let timeExistents = [];
  let timeExistentsValue = [];
  for(let key = 0; key < 10; key++){
    database.ref(`Ranking/${category}/${difficulty}/` + key).once("value")
      .then(function(snapshot) {
        nicknameExistents[key] = snapshot.child("/Nickname").val();
        errorsExistents[key] = snapshot.child("/Errors").val();
        timeExistents[key] = snapshot.child("/Time").val();
        timeExistentsValue[key] = timeExistents[key].replace(":", "");
        timeExistentsValue[key] = timeExistentsValue[key].replace("s", "");
      }
    );
  }
  setTimeout(function(){
    for (const key in errorsExistents) {
      if(currentErrors < errorsExistents[key]){
        nicknameExistents.splice(key, 0, nickname);
        nicknameExistents.pop();
        errorsExistents.splice(key, 0, currentErrors);
        errorsExistents.pop();
        timeExistents.splice(key, 0, time);
        timeExistents.pop();
        break;
      } else if (currentErrors == errorsExistents[key]){
        if(timeValue < timeExistentsValue[key]){
          nicknameExistents.splice(key, 0, nickname);
          nicknameExistents.pop();
          errorsExistents.splice(key, 0, currentErrors);
          errorsExistents.pop();
          timeExistents.splice(key, 0, time);
          timeExistents.pop();
          break;
        }
      }
    }
    for(let key = 0; key < 10; key++){
      database.ref(`Ranking/${category}/${difficulty}/` + key).update({
        Nickname: nicknameExistents[key],
        Errors: errorsExistents[key],
        Time: timeExistents[key]
      });
    }
  }, 1500);
}

const dissolveItems = (disappearItems, appearItems) => {
  animationTime = 400;
  for (const key in disappearItems) {
    setTimeout(function(){
      disappearItems[key].classList.add("hidden");
    }, animationTime);
    disappearItems[key].animate([
      {opacity: 1, transform: "perspective(100px) translateZ(0px)"},
      {opacity: 0, transform: "perspective(100px) translateZ(-20px)"}
    ],{
      duration: animationTime
    })
  }
  for (const key in appearItems) {
    setTimeout(function(){
      appearItems[key].classList.remove("hidden");
    }, animationTime);
    appearItems[key].animate([
      {opacity: 0, transform: "perspective(100px) translateZ(-20px)"},
      {opacity: 1, transform: "perspective(100px) translateZ(0px)"}
    ],{
      duration: animationTime
    })
  }
}
const dissolveSection = (disappearSection, appearSection) => {
  animationTime = 200;
  setTimeout(function(){
    disappearSection.classList.add("hidden");
    appearSection.classList.remove("hidden");
  }, animationTime)
  disappearSection.animate([
    {opacity: 1, transform: "perspective(100px) translateZ(0px)"},
    {opacity: 0, transform: "perspective(100px) translateZ(-20px)"}
  ],{
    duration: animationTime
  })
  appearSection.animate([
    {opacity: 0, transform: "perspective(100px) translateZ(-20px)"},
    {opacity: 1, transform: "perspective(100px) translateZ(0px)"}
  ],{
    duration: animationTime,
    delay: animationTime
  })
}

const Cronometro = () => {
  let minuteTen = 0;
  let minuteUnit = 0;
  let secondTen = 0;
  let secondUnit = 0;
  if(timerID){
    clearInterval(timerID);
    minuteTenContainer.innerHTML = minuteTen;
    minuteUnitContainer.innerHTML = minuteUnit;
    secondTenContainer.innerHTML = secondTen;
    secondUnitContainer.innerHTML = secondUnit;
  }
  timerID = setInterval(function(){
    secondUnit++;
    if(secondUnit == 10){
      secondUnit = 0;
      secondTen++;
    }
    if(secondTen == 6){
      secondTen = 0;
      minuteUnit++;
    }
    if(minuteUnit == 10){
      minuteUnit = 0;
      minuteTen++;
    }
    minuteTenContainer.innerHTML = minuteTen;
    minuteUnitContainer.innerHTML = minuteUnit;
    secondTenContainer.innerHTML = secondTen;
    secondUnitContainer.innerHTML = secondUnit;
    timeValue = `${minuteTen}${minuteUnit}${secondTen}${secondUnit}`;
    time = `${minuteTen}${minuteUnit}:${secondTen}${secondUnit}s`;
  }, 1000);
}


for (const key in cards) {
  cards[key].addEventListener("click", function(){
    flipCards(key);
  });
}

buttonCategoryDevelopers.addEventListener("click", function () {
  setCategory("Developers");
});
buttonCategoryCountries.addEventListener("click", function () {
  setCategory("Countries");
});
buttonCategoryAnimals.addEventListener("click", function () {
  setCategory("Animals");
});

buttonDifficultyEasy.addEventListener("click", function () {
  setDifficulty("Easy");
});
buttonDifficultyNormal.addEventListener("click", function () {
  setDifficulty("Normal");
});
buttonDifficultyHard.addEventListener("click", function () {
  setDifficulty("Hard");
});

buttonRanking.addEventListener("click", function(){
  dissolveSection(cardsSection, rankingSection);
});
buttonRankingPlayAgain.addEventListener("click", function() {
  dissolveItems(difficultyItems, categoryItems);
  dissolveSection(rankingSection, configurationSection);
  congratulation.classList.add("hidden");
  PlayAgain();
});
buttonTutorial.addEventListener("click", function() {
  dissolveSection(configurationSection, tutorialSection);
});
buttonTutorialBack.addEventListener("click", function(){
  dissolveSection(tutorialSection, configurationSection);
});
buttonDifficultyBack.addEventListener("click", function () {
  dissolveItems(difficultyItems, categoryItems);
});
buttonReset.addEventListener("click", Reset);
buttonPlayAgain.addEventListener("click", function(){
  dissolveItems(difficultyItems, categoryItems);
  dissolveSection(cardsSection, configurationSection);
  congratulation.classList.add("hidden");
  PlayAgain();
});

//Media Query:
let tablet = window.matchMedia("(max-width: 668px)");
let phone = window.matchMedia("(max-width: 425px)");
function mediaQueryTablet() {
  if (tablet.matches) {
    buttonTutorialBack.innerHTML = '<i class="fas fa-reply"></i>';
    buttonDifficultyBack.innerHTML = '<i class="fas fa-reply"></i>';
    buttonSignOut.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
    buttonRankingPlayAgain.innerHTML = '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 138.7 158.7"><defs><style>.cls-1{fill:#ddd;stroke:#ddd;}.cls-1,.cls-2,.cls-3{stroke-miterlimit:10;stroke-width:2px;}.cls-2{fill:#eee;stroke:#eee;}.cls-3{fill:#fff;stroke:#fff;}</style></defs><title>icon_cards</title><path class="cls-1" d="M21,1H61A19.93,19.93,0,0,1,81,21V81a19.93,19.93,0,0,1-20,20H21A19.93,19.93,0,0,1,1,81V21A20,20,0,0,1,20.7,1Z" transform="translate(0 0)"></path><path class="cls-2" d="M49.4,29.4l40-.1a19.93,19.93,0,0,1,20,20v60a19.93,19.93,0,0,1-20,20l-40,.1a19.93,19.93,0,0,1-20-20V49.5A20,20,0,0,1,49.1,29.4Z" transform="translate(0 0)"></path><path class="cls-3" d="M77.7,57.7h40a20.06,20.06,0,0,1,20,20v60a20.06,20.06,0,0,1-20,20h-40a20.06,20.06,0,0,1-20-20v-60A20.06,20.06,0,0,1,77.7,57.7Z" transform="translate(0 0)"></path></svg>'
  } else {
    buttonTutorialBack.innerHTML = '<i class="fas fa-reply"></i>Volver atras';
    buttonDifficultyBack.innerHTML = '<i class="fas fa-reply"></i>Volver atras';
    buttonSignOut.innerHTML = '<i class="fas fa-sign-out-alt"></i> Cerrar Sesión';
    buttonRankingPlayAgain.innerHTML = '<svg id="Capa_1" data-name="Capa 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 138.7 158.7"><defs><style>.cls-1{fill:#ddd;stroke:#ddd;}.cls-1,.cls-2,.cls-3{stroke-miterlimit:10;stroke-width:2px;}.cls-2{fill:#eee;stroke:#eee;}.cls-3{fill:#fff;stroke:#fff;}</style></defs><title>icon_cards</title><path class="cls-1" d="M21,1H61A19.93,19.93,0,0,1,81,21V81a19.93,19.93,0,0,1-20,20H21A19.93,19.93,0,0,1,1,81V21A20,20,0,0,1,20.7,1Z" transform="translate(0 0)"></path><path class="cls-2" d="M49.4,29.4l40-.1a19.93,19.93,0,0,1,20,20v60a19.93,19.93,0,0,1-20,20l-40,.1a19.93,19.93,0,0,1-20-20V49.5A20,20,0,0,1,49.1,29.4Z" transform="translate(0 0)"></path><path class="cls-3" d="M77.7,57.7h40a20.06,20.06,0,0,1,20,20v60a20.06,20.06,0,0,1-20,20h-40a20.06,20.06,0,0,1-20-20v-60A20.06,20.06,0,0,1,77.7,57.7Z" transform="translate(0 0)"></path></svg>Jugar de Nuevo'
  }
}
function mediaQueryPhone() {
  if (phone.matches) {
    buttonReset.innerHTML = '<i class="fas fa-undo-alt"></i>';
  } else {
    buttonReset.innerHTML = '<i class="fas fa-undo-alt"></i>Reset';
  }
}
mediaQueryTablet();
mediaQueryPhone();
tablet.addListener(mediaQueryTablet);
phone.addListener(mediaQueryPhone);

// Reset Ranking DataBase:
// const resetRanking = (hola, adios) => {
//   for(let key = 0; key < 10; key++){
//     database.ref(`Ranking/${hola}/${adios}/` + key).update({
//       Nickname: `Usuario N°${key+1}`,
//       Errors: "99999",
//       Time: "99:99s"
//     });
//   }
// }

// resetRanking("Animals", "Easy");
// resetRanking("Animals", "Normal");
// resetRanking("Animals", "Hard");
// resetRanking("Countries", "Easy");
// resetRanking("Countries", "Normal");
// resetRanking("Countries", "Hard");
// resetRanking("Developers", "Easy");
// resetRanking("Developers", "Normal");
// resetRanking("Developers", "Hard");




