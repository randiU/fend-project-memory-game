//$(document).ready(function() {
//  "use strict";
//changes color of box mouse is hovering over to light gray
/**$('.front').hover(function() {
    $(this).css('background','#889da0');
  },
  function() {
    $(this).css('background','#2e3d49');
  }); */
var cardPics, clickCheck, cardChild, refreshPage, start,

  cardPics = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-leaf',
    'fa fa-bicycle', 'fa fa-bomb', 'fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube',
    'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bomb'
  ],
  chosenCard = $('.card'),
  start = $('.start'),
  cardChild = chosenCard.children(),
  //flips card over to reveal image
  /*clickCheck = $('.front').click(function() {
    $(this).toggleClass('front');
    $(this).toggleClass('open');
  }),*/
  //refreshes page
  refreshPage = $("button").click(function() {
    location.reload(true);
  });

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

//Uses start button to shuffle cards
function startGame() {
  //starts by shuffling cards
  shuffle(cardPics);
  cardChild.removeClass();
  cardChild.each(function(index) {
    $(this).addClass(cardPics[index]);
    index++;
  });
};

// variable holds array with cards that have been clicked on/open.
var openedCards = [];

function clickAndCompare() {
  var clickOpenCount = 0;

  $('.front').click(function() {
    var $clickedCard = $(this);

    var isOpen = $clickedCard.hasClass("open")

    console.log(isOpen) //should be false initially, class has not been toggled to open.

    if (openedCards.length < 2 && !isOpen) {// isOpen === false
       $clickedCard.toggleClass('front');
       $clickedCard.toggleClass('open');

       openedCards.push($clickedCard) //adds clicked card to openedCards array

       clickOpenCount += 1;

   }

   if (openedCards.length === 2) {
        // https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
        var firstCard = openedCards[0].children().attr('class');
        var secondCard = openedCards[1].children().attr('class');

        console.log(openedCards[0].children().attr('class'),
        openedCards[1].children().attr('class'),
        openedCards[0].children().attr('class') === openedCards[1].children().attr('class'))

        //print what was stored in openedCards
        console.log(firstCard, secondCard);
      // compare
      if (firstCard === secondCard) {
        console.log('match!');
        openedCards[0].removeClass('open');
        openedCards[1].removeClass('open');
        openedCards[0].addClass('match');
        openedCards[1].addClass('match');
        openedCards = [];
        clickOpenCount = 0;
      } else {
        console.log('dang!');
        console.log(firstCard, secondCard);
        openedCards[0].removeClass('open');
        openedCards[0].addClass('front');
        openedCards[1].removeClass('open');
        openedCards[1].addClass('front');
        openedCards = [];
        clickOpenCount = 0;

        console.log(openedCards[0], openedCards[1]);
      }







      // if cards match, add match class
      // otherwise remove class open
      // you could use a setTimout function to delay
   }
  });

  /*if (firstClick === secondClick) {
    firstClick.freeze(obj);
    secondClick.freeze(obj);
    console.log(firstClick);
    console.log(secondClick);
  };*/
 // console.log(firstClick);
 // console.log(secondClick);
};




//startGame();
clickAndCompare();
//});
