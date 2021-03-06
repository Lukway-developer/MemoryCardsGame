const rankingNicknamesContainer = document.querySelectorAll(".ranking_table-nicknames");
const rankingErrorsContainer = document.querySelectorAll(".ranking_table-errors");
const rankingTimesContainer = document.querySelectorAll(".ranking_table-times");

let rankingNicknames = [];
let rankingErrors = [];
let rankingTimes = [];

toArray(rankingNicknamesContainer, rankingNicknames);
toArray(rankingErrorsContainer, rankingErrors);
toArray(rankingTimesContainer, rankingTimes);

const showRanking = () => {
  for(let key = 0; key < 10; key++){
    database.ref(`Ranking/${categorySelectorValue}/${difficultySelectorValue}/` + key).once("value")
      .then(function(snapshot) {
        rankingNicknames[key].innerHTML = snapshot.child("/Nickname").val();
        rankingErrors[key].innerHTML = snapshot.child("/Errors").val();
        rankingTimes[key].innerHTML = snapshot.child("/Time").val();
      }
    );
  }
};

let categorySelectorValue;
let difficultySelectorValue;
showRanking();

categorySelector.addEventListener("change", function(){
  categorySelectorValue = categorySelector.value;
  showRanking();
});

difficultySelector.addEventListener("change", function(){
  difficultySelectorValue = difficultySelector.value;
  showRanking();
});

