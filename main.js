$(document).ready(function() {
$('.card').on('click', cardHandler);
$('header').on('click', rotateBack);
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

function cardHandler() {
    if (cardCount === 0) {
        //if it's the first card store that card and increase card count to 1
        firstCard = $(this);
        first = firstCard.find('.front').attr('compare');
        firstCard.addClass('backFlip');
        cardCount++;
    }
    else if (cardCount === 1) {
        //if its the second card store that card and we'll perform a conditional check
        totalCards++;
        secondCard = $(this);
        second = secondCard.find('.front').attr('compare');
        secondCard.addClass('backFlip');
        cardCount++;
        if (first === second) {
            //if the cards match things match here and card count get's reset to 0
            setTimeout(function() {
                firstCard.find('.front').css({
                    'background-color': 'rgba(34,139,34, .7)',
                    'transition': '1s'
                });
                secondCard.find('.front').css({
                    'background-color': 'rgba(34,139,34, .7)',
                    'transition': '1s'
                });
                console.log('matched!!!!!!!!!');
                matchCount++;
                accuracy = (matchCount / totalCards) * 100;
                $('.accuracy').text(accuracy.toFixed(1) + '%');
                cardCount = 0;
            }, 500);
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
                tryCount++;
                $('.tryCount').text(tryCount);
            }, 1000);

        }

    }
}









function rotateBack() {
    $('.card').removeClass('backFlip').css('transition','1s');
}

