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

const menuSection = document.querySelector(".menu");
const tutorialSection = document.querySelector(".tutorial");
const rankingSection = document.querySelector(".ranking");

const buttonPlay = document.querySelector(".button-play");
const buttonTutorial = document.querySelector(".button-tutorial");
const buttonRanking = document.querySelector(".button-ranking");
const buttonBack = document.querySelectorAll(".button-back-top");

const userVerification = () => {
  // Detección del Estado del Usuario (login o no)
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      window.location.href = "https://memorycards-game.web.app/game";
    } else {
      window.location.href = "https://memorycards-game.web.app/login";
    }
  });
}

const dissolve = (disappearSection, appearSection) => {
  animationTime = 500;
  setTimeout(function(){
    disappearSection.classList.add("hidden");
    appearSection.classList.remove("hidden");
  }, animationTime)
  disappearSection.animate([
    {opacity: 1, transform: "perspective(100px) translateZ(0px)"},
    {opacity: 0, transform: "perspective(100px) translateZ(-20px)"}
  ],{
    duration: animationTime,
    fill: "forwards"
  })
  appearSection.animate([
    {opacity: 0, transform: "perspective(100px) translateZ(-20px)"},
    {opacity: 1, transform: "perspective(100px) translateZ(0px)"}
  ],{
    duration: animationTime,
    delay: animationTime,
    fill: "forwards"
  })
}

buttonPlay.addEventListener("click", userVerification);
buttonTutorial.addEventListener("click", function(){dissolve(menuSection, tutorialSection)});
buttonRanking.addEventListener("click", function(){dissolve(menuSection, rankingSection)});
buttonBack[0].addEventListener("click", function(){dissolve(tutorialSection, menuSection)});
buttonBack[1].addEventListener("click", function(){dissolve(rankingSection, menuSection)});

const toArray = (nodelist, array) => {
  for (let i = 0; i < nodelist.length; i++) {
    array[i] = nodelist[i];
  }
}

let tablet = window.matchMedia("(max-width: 668px)");
function mediaQueryTablet() {
  if (tablet.matches) {
    buttonBack[0].innerHTML = '<i class="fas fa-reply"></i>';
    buttonBack[1].innerHTML = '<i class="fas fa-reply"></i>';
  } else {
    buttonBack[0].innerHTML = '<i class="fas fa-reply"></i>Volver atras';
    buttonBack[1].innerHTML = '<i class="fas fa-reply"></i>Volver atras';
  }
}
mediaQueryTablet();
tablet.addListener(mediaQueryTablet)
