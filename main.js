$(document).ready(function() {
$('.card').on('click', cardHandler);
$('header').on('click', rotateBack);
});

var cardCount = 0;
var first;
var second;
var firstCard;
var secondCard;

function cardHandler() {
    if (cardCount === 0) {
        firstCard = $(this);
        first = firstCard.find('.front').attr('compare');
        firstCard.addClass('backFlip');
        cardCount++;
    }
    else if (cardCount === 1) {
        secondCard = $(this);
        second = secondCard.find('.front').attr('compare');
        secondCard.addClass('backFlip');
        cardCount++;
        if (first === second) {
            firstCard.css('background-color', 'lightGreen');
            secondCard.css('background-color', 'lightGreen');
            console.log('matched!!!!!!!!!');
            cardCount = 0;
        }
        else {
            console.log('no matches here!!!!!');
            setTimeout(function() {
                firstCard.removeClass('backFlip').css('transition', '1.2s');
                secondCard.removeClass('backFlip').css('transition', '1.2s');
                cardCount = 0;
            }, 1000);

        }

    }
}









function rotateBack() {
    $('.card').removeClass('backFlip').css('transition','1s');
}

