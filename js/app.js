//$(document).ready(function() {
//  "use strict";

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
var chosenCard = $(".card");
var start = $(".start");
var cardChild = chosenCard.children();
var openedCards = [];
var matches = 0;
var timer = $(".timer");
var endTime = null;
var numberOfClicks = 0;
var movesNumber = 0;
var timerGo;

//refreshes page
var refreshPage = $("button").click(function() {
  location.reload(true);
});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
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
  cardChild.removeClass();
  cardChild.each(function(index) {
    $(this).addClass(cardPics[index]);
    index++;
  });
}

//Prompts user that they've won the game and stops the timer
function endGame() {
  if (matches === 8) {
    alert("You've Won!!! It took " + endTime + " and " + movesNumber + " moves!");
    clearInterval(timerGo);
  };
};

//states how many times user has clicked on cards
function movesUpdate() {
  $(".front").click(function() {
    movesNumber += 1;
    document.getElementById("moves").innerHTML= movesNumber + " Moves";
  });
};

//Compares 2 cards that user clicks on. Leaves them open if they match, flips them back if they don't.
function clickAndCompare() {
  var clickOpenCount = 0;

  $(".front").click(function() {
    var $clickedCard = $(this);
    var isOpen = $clickedCard.hasClass("open");
    console.log(isOpen); //should be false initially, class has not been toggled to open.
    if (openedCards.length < 2 && !isOpen) {
      // isOpen === false
      $clickedCard.toggleClass("front");
      $clickedCard.toggleClass("open");
      openedCards.push($clickedCard); //adds clicked card to openedCards array
      clickOpenCount += 1;
    }
    if (openedCards.length === 2) {
      // https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
      var firstCard = openedCards[0].children().attr("class");
      var secondCard = openedCards[1].children().attr("class");

      console.log(
        openedCards[0].children().attr("class"),
        openedCards[1].children().attr("class"),
        openedCards[0].children().attr("class") ===
          openedCards[1].children().attr("class")
      );

      //print what was stored in openedCards
      console.log(firstCard, secondCard);
      // compares cards, if a match update color, if no match flip back
      if (firstCard === secondCard) {
        console.log("match!");
        openedCards[0].removeClass("open");
        openedCards[1].removeClass("open");
        openedCards[0].addClass("match");
        openedCards[1].addClass("match");
        openedCards = [];
        clickOpenCount = 0;
        matches += 1;
        console.log(matches);
      } else {
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
      setTimeout(endGame, 780);
    }
  });
}

//Decreases stars based on how many click attempts user has made(doesn't work)
function stars() {
  chosenCard.click(function() {
    numberOfClicks += 1;
    console.log("you've clicked " + numberOfClicks + " times");
    if (numberOfClicks > 20 && numberOfClicks <= 30) {

      $(".stars").children().remove();
      $(".stars").append("<li><i class=\"fa fa-star\"></i></li>");
      $(".stars").append("<li><i class=\"fa fa-star\"></i></li>");
      $(".stars").append("<li><i class=\"fa fa-star-o\"></i></li>");

    }
    if (numberOfClicks > 30 && numberOfClicks <= 40) {

      $(".stars").children().remove();
      $(".stars").append("<li><i class=\"fa fa-star\"></i></li>");
      $(".stars").append("<li><i class=\"fa fa-star-o\"></i></li>");
      $(".stars").append("<li><i class=\"fa fa-star-o\"></i></li>");
    }
    if (numberOfClicks > 40) {

      $(".stars").children().remove();
      $(".stars").append("<li><i class=\"fa fa-star-o\"></i></li>");
      $(".stars").append("<li><i class=\"fa fa-star-o\"></i></li>");
      $(".stars").append("<li><i class=\"fa fa-star-o\"></i></li>");
    }
  });
}

/*$(".front").hover(
  function() {
    $(this).css("background", "#889da0");
  },
  function() {
    console.log($(this).attr("class"))
    if (!$(this).hasClass("match")) {
      $(this).css("background", "#2e3d49");
    }
    if ($(this).hasClass("match")) {
      $(this).css("background", "#02ccba");
    }

  }
);*/

//timer stars once user clicks on the first card
startTime = 0;
var counter = 0;
var endTime = 0;

function startTimer() {
  console.log(counter);
    $(".front").click(function() {
      if (counter === 0) {
        counter = 1;
        startTime = new Date();
        timerGo = setInterval(function() {
          //$('.Timer').text((new Date - start) / 1000 + " Seconds");
          var seconds = Math.floor((new Date() - startTime) / 1000);
          var timerText = seconds + " Seconds";
          $(".timer").text(timerText);
          endTime = timerText;

        }, 1000);
      };
    });

}

// clearInterval(timerGo); // stop the timer

//shuffleCards();
clickAndCompare();
stars();
startTimer();
movesUpdate();


//});
