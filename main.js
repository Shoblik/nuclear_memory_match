$(document).ready(function() {
    reset();
    $('.card').on('click', cardHandler);
    $('.reset').on('click', reset);

    /////////////////////////////////////REMOVE BEFORE RELEASE//////////////////////////
    $('.accuracy').on('click', function() {
       $('.card').toggleClass('backFlip');
    });

});
var totalCards = 0;
var cardCount = 0;
var timesPlayed = 0;
var tryCount = 0;
var accuracy = 0;
var matchCount = 0;
var first;
var second;
var firstCard;
var secondCard;
var disqualCount;
var playerOne = true;
var compMemory = [];


function reset() {
    playerOne = true;
    timesPlayed++;
    $('.card').removeClass('backFlip').css('transition', '1s');
    $('.card').find('.front').removeClass('foundCard').css('transition', '2s');
    totalCards = 0;
    cardCount = 0;
    tryCount = 0;
    accuracy = 0;
    matchCount = 0;
    disqualCount = 0;
    first;
    second;
    firstCard;
    secondCard;
    $('.timesPlayed').text(timesPlayed);
    $('.accuracy').text(accuracy.toFixed(1) + '%');
    $('.tryCount').text(tryCount);

    /////////////////////////////////////////////////////////
        var staticCardArr = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9];
        var cardArr = staticCardArr.slice();

        var cards = $('.row').find('.card .front')
        for (var i=0;i<cards.length;i++) {
            var randomNum = Math.floor((Math.random() * cardArr.length));
            $(cards[i]).text(cardArr[randomNum]).attr('compare', cardArr[randomNum]);
            cardArr.splice(randomNum, 1);
        }
}
function cardHandler() {
    if (cardCount === 0 && playerOne === true) {
        //if it's the first card store that card and increase card count to 1
        firstCard = $(this);
        console.log(firstCard);
        first = firstCard.find('.front').attr('compare');
        firstCard.addClass('backFlip');
        cardCount++;

    }
    else if (cardCount === 1) {
        //if its the second card store that card and we'll perform a conditional check
        $('.tryCount').text(totalCards);
        secondCard = $(this);
        if (secondCard.hasClass('backFlip')) {
            cardCount = 0;
            firstCard.removeClass('backFlip').css('transition', '1.0s');
            disqualCount++;
            if (disqualCount == 3) {
                reset();
                alert('you have been disqualified for cheating!!!');
            }
            return;

        }
        second = secondCard.find('.front').attr('compare');
        secondCard.addClass('backFlip');
        totalCards++;
        cardCount++;

        if (first === second) {
            //if the cards match things match here and card count get's reset to 0
            setTimeout(function() {
                firstCard.find('.front').addClass('foundCard');
                secondCard.find('.front').addClass('foundCard');
                console.log('matched!!!!!!!!!');
                cardCount = 0;
            }, 500);
            matchCount++;
            if (first === second && matchCount === 9) {
                console.log('YOU WIN');
                timesPlayed++;
                $('.timesPlayed').text(timesPlayed);
            }
        }
        else {
            //If the cards don't match flip them back over and set cardCount to 0
            console.log('no matches here!!!!!');
            setTimeout(function() {
                firstCard.removeClass('backFlip').css('transition', '1.0s');
                secondCard.removeClass('backFlip').css('transition', '1.0s');
                cardCount = 0;
            }, 1000);

            ////////////////AI implementation//////////////////////////////////////////////////
            setTimeout(function() {
                compMemory.push(first,second);
                playerOne = false;
                var cardsNotFlipped = $('.card').not('.backFlip');
                var randomCard = Math.floor((Math.random() * cardsNotFlipped.length));

                $(cardsNotFlipped[randomCard]).addClass('backFlip');
            }, 2000);

        }

        accuracy = (matchCount / totalCards) * 100;
        $('.accuracy').text(accuracy.toFixed(1) + '%');
    }

}



