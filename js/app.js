var cardPics = [
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bomb",
  "fa fa-diamond",
  "fa fa-paper-plane-o",
  "fa fa-anchor",
  "fa fa-bolt",
  "fa fa-cube",
  "fa fa-leaf",
  "fa fa-bicycle",
  "fa fa-bomb"
];
//common variables
let deckChild = $(".deck").children();
let chosenCard = $(".card");
let cardChild = chosenCard.children();
let openedCards = [];
let matches = 0;
let movesNumber = 0;

//startTimer variables
let timerGo;
let startTime = 0;
let counter = 0;
let endTime = null;
let timer = $(".timer");

//star variables
let starCount = 3;
let starRating = [28, 38, null];
let numberOfClicks = 0;

//endGame variables
//https://www.w3schools.com/howto/howto_css_modals.asp
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

//Restores variables back to original state
function gameInit() {
  modal.style.display = "none";
  deckChild.removeClass('open');
  deckChild.removeClass('match');
  deckChild.addClass('front');
  clearInterval(timerGo);
  movesNumber = 0;
  matches = 0;
  openedCards = [];
  counter = 0;
  numberOfClicks = 0;
  starCount = 3;
  document.getElementById("moves").innerHTML = movesNumber + " Moves";
  document.getElementById("timer").innerHTML = "00:00";
  $(".stars").children().removeClass('star-remove-color');
  shuffleCards();
}

//restarts game
function restart() {
  $("#repeat").click(function() {
    gameInit();
  });
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//shuffles cards immediately
function shuffleCards() {
  shuffle(cardPics);
  //removes child element of chosenCard
  cardChild.removeClass();
  //goes through each card and adds the shuffled cards as new child elements
  cardChild.each(function(index) {
    $(this).addClass(cardPics[index]);
    index++;
  });
}

//clears out info about previous game
function newGame(){
  $(".again").click(function() {
    gameInit();
  });
};

//Prompts user that they've won the game and stops the timer
function modalPop() {
  if (matches === 8) {
    clearInterval(timerGo);
    //changes modal display from none to block so it becomes visable
    modal.style.display = "block";
    //ensuring correct grammar
    if (starCount === 1) {
      $("#gameStats").text(
        "You received " +
          starCount +
          " star and it took " +
          endTime +
          " seconds to finish."
      );
    } else {
      $("#gameStats").text(
        "You received " +
          starCount +
          " stars and it took " +
          endTime +
          " seconds to finish."
      );
    };
  };
}

//https://www.w3schools.com/howto/howto_css_modals.asp
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
};
//https://www.w3schools.com/howto/howto_css_modals.asp
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};



//states how many times user has clicked on cards
let movesList = [];
function movesUpdate() {
  $(".front").click(function() {
    let $moveSelection = $(this);
    //adds card user clicks on to movesList array
    movesList.push($moveSelection);
    let firstMoveId = movesList[0].attr("id");
    let secondMoveId = movesList[1].attr("id");
    //checks that user has clicked on two cards and that it's not the same card
    if (movesList.length === 2 && firstMoveId != secondMoveId) {
      movesNumber += 1;
      if (movesNumber === 1) {
        document.getElementById("moves").innerHTML = movesNumber + " Move";
        movesList = [];
      } else {
        document.getElementById("moves").innerHTML = movesNumber + " Moves";
        movesList = [];
      };
    } else {
      //if user clicked on same card twice, this will remove the duplicate card from the array
      movesList.splice(-1,1);
    };
  });
}



//Compares 2 cards that user clicks on. Leaves them open if they match, flips them back if they don't.
function clickAndCompare() {
  //keeps track of how many cards are open
  let clickOpenCount = 0;
  $(".front").click(function() {
    let $clickedCard = $(this);
    let isOpen = $clickedCard.hasClass("open");
    //makes sure the user hasn't clicked on more than two cards and that card was not open
    if (openedCards.length < 2 && !isOpen) {
      //flips cards over and adds them to the openedCards array
      $clickedCard.toggleClass("front");
      $clickedCard.toggleClass("open");
      openedCards.push($clickedCard); //adds clicked card to openedCards array
      clickOpenCount += 1;
    }
    if (openedCards.length === 2) {
      let firstCard = openedCards[0].children().attr("class");
      let secondCard = openedCards[1].children().attr("class");
      let firstId = openedCards[0].attr("id");
      let secondId = openedCards[1].attr("id");

      // compares cards, if a match update color, if no match flip back
      if (firstCard === secondCard && firstId != secondId) {
        console.log("match!");
        openedCards[0].addClass("match");
        openedCards[1].addClass("match");
        openedCards = []; //resets array
        clickOpenCount = 0; //resets count
        matches += 1;
      } else {
        //delays card flip back and resets openedCards and clickOpenCount
        setTimeout(function() {
          console.log("dang!");
          console.log(firstCard, secondCard);
          openedCards[0].removeClass("open");
          openedCards[0].addClass("front");
          openedCards[1].removeClass("open");
          openedCards[1].addClass("front");
          openedCards = [];
          clickOpenCount = 0;
        }, 780);
      }
      setTimeout(modalPop, 780);
    }
  });
}

//Decreases stars based on how many click attempts user has made(doesn't work)
function stars() {
  chosenCard.click(function() {
    numberOfClicks += 1;
    console.log("you've clicked " + numberOfClicks + " times");
    $(".stars")
      .children()
      .each(function(index, starElem) {
        console.log(index, starElem);

        /* Indexes backwards through the starRating array and if numberOfClicks
        equals current index, the star's color is changed to lightgray
        */
        if (starRating[starRating.length - 1 - index] === numberOfClicks)
          $(starElem).addClass("star-remove-color");

        //used in modalPop to let user know how many stars they received
        if (numberOfClicks < 28) {
          starCount = 3;
        };
        if (numberOfClicks >= 28 && numberOfClicks < 38 ) {
          starCount = 2;
        };
        if (numberOfClicks >= 38){
          starCount = 1;
        };
      });
  });
}


//Changes text from singular to plural based on time
function secondsText(secondsTime) {
  if (secondsTime === 1) {
    return " Second";
  } else {
    return " Seconds";
  };
};

//timer stars once user clicks on the first card
function startTimer() {
  console.log(counter);
  $(".front").click(function() {
    if (counter === 0) {
      counter = 1;
      startTime = new Date();
      timerGo = setInterval(function() {
        //$('.Timer').text((new Date - start) / 1000 + " Seconds");
        let seconds = Math.floor((new Date() - startTime) / 1000);
        let timerText = seconds + secondsText(seconds);
        $(".timer").text(timerText);
        endTime = timerText;
      }, 1000);
    }
  });
}


shuffleCards();
clickAndCompare();
stars();
startTimer();
movesUpdate();
modalPop();
newGame();
restart();
