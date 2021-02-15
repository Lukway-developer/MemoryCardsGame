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

const inputEmail = document.querySelector(".login_input-email");
const inputPassword = document.querySelector(".login_input-password");
const inputNickname = document.querySelector(".nickname_input");
const nicknameCard = document.querySelector(".nickname");

const buttonLogin = document.querySelector(".button-login");
const buttonRegister = document.querySelector(".button-register");
const buttonGoogle = document.querySelector(".google");
const buttonFacebook = document.querySelector(".facebook");
const buttonTwitter = document.querySelector(".twitter");
const buttonSaveNickname = document.querySelector(".button-savenickname");

// Detección del Estado del Usuario (login o no)
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    let nickname;
    database.ref("Users/" + user.uid).once("value")
      .then(function(snapshot) {
        nickname = snapshot.child("/Nickname").val();
        if(nickname != null){
          console.log("si");
          window.location.href = "https://memorycards-game.web.app/game";
        } else {
          nicknameCard.classList.remove("hidden");
        }
      }
    );
  }
});

// Metodos de Inicio de Sesión

const createUser = (Email, Password) => {
  let email = Email.value;
  let password = Password.value;
  let validation = validationPassword(password);
  if(validation == true){
    alert("No ultilice carácteres especiales, solo letras, guión bajo o números");
  } else {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
      database.ref("Users/" + user.uid).update({
        Email: user.email
      });
    })
    .catch((error) => {
      var errorCode = error.code;
      authError(errorCode);
    });
  }
}

const loginUser = (Email, Password) => {
  let email = Email.value;
  let password = Password.value;
  console.log(email);
  console.log(password);
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((user) => {
    // Signed in
    database.ref("Users/" + user.uid).update({
      Email: user.email
    });
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;

    console.log(errorCode);
    console.log(errorMessage);

    authError(errorCode);
  });
}

const loginGoogle = () => {

  let provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      database.ref("Users/" + user.uid).update({
        Email: user.email
      });
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log(credential);

      authError(errorCode);
    }
  );
}

const loginFacebook = () => {

  let provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      database.ref("Users/" + user.uid).update({
        Email: user.email
      });
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log(credential);

      authError(errorCode);
    }
  );
}

const loginTwitter = () => {
  let provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      // var token = result.credential.accessToken;
      // var secret = result.credential.secret;
      // The signed-in user info.
      var user = result.user;
      database.ref("Users/" + user.uid).update({
        Email: user.email
      });
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log(credential);

      authError(errorCode);
    }
  );
}

// Mensajes de error
authError = (error) => {
  if (error === "auth/invalid-email"){
    alert(`Por favor, inserta una dirección de correo electronico valida 🙏`);
  }
  if (error === "auth/wrong-password"){
    alert("El email o la contraseña son incorrectas, por favor revisalas");
  }
}

const validationPassword = (data) => {
  const invalidCharacter = [" ", ",", ";", "<", ">", "/", "'\'", "|", "-", "°", "¬", "~", "+", "-", "*", "%", "&", "$", "!", "¡", "¿", "?", "(", ")", "{", "}", "[", "]"];
  let status = invalidCharacter.some(x => data.includes(x));
  if(status){
    return true;
  } else {
    return false;
  }
}
const validationNickname = (data) => {
  const invalidCharacter = [",", ";", "<", ">", "/", "'\'", "|", "-", "°", "¬", "~", "+", "-", "*", "%", "&", "$", "!", "¡", "¿", "?", "(", ")", "{", "}", "[", "]"];
  let status = invalidCharacter.some(x => data.includes(x));
  if(status){
    return true;
  } else {
    return false;
  }
}
const saveNickname = () => {
  let nickname = inputNickname.value;
  let nicknameLowerCase = nickname.toLowerCase();
  let nicknamesExistents = [];
  let nicknameExistentsNumber;
  let validation = validationNickname(nicknameLowerCase);
  if(nickname.length < 4){
    alert("Su nombre debe tener al menos 4 letras");
  } else if(validation == true){
    alert("No ultilice carácteres especiales, solo letras, guión bajo o números");
  } else {
    let user = firebase.auth().currentUser;
    database.ref("Users/" + user.uid + "/Email").remove();
    database.ref("Nicknames/").on('value', (snapshot) =>{
      nicknameExistentsNumber = snapshot.numChildren();
    });
    setTimeout(function(){
      for(let key = 0; key < nicknameExistentsNumber; key++){
        database.ref("Nicknames/" + key).on('value', (snapshot) =>{
          nicknamesExistents[key] = snapshot.val();
        });
      }
      if(nicknamesExistents.indexOf(nickname) != -1){
        alert("Este nombre ya esta en uso, por favor utilice otro nombre");
      } else {
        database.ref("Nicknames/" + `${nicknamesExistents.length}`).set(nicknameLowerCase);
        database.ref("Users/" + user.uid).update({
          Nickname: nickname
        });
        window.location.href = "https://memorycards-game.web.app/game";
      }
    }, 1500);
  }
}

buttonLogin.addEventListener("click", function () {
  loginUser(inputEmail, inputPassword);
});
buttonRegister.addEventListener("click", function () {
  createUser(inputEmail, inputPassword);
});
buttonGoogle.addEventListener("click", loginGoogle);
buttonFacebook.addEventListener("click", loginFacebook);
buttonTwitter.addEventListener("click", loginTwitter);
buttonSaveNickname.addEventListener("click", saveNickname);


