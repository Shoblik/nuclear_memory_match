$(document).ready(function() {
    reset();
    $('.card').on('click', cardHandler);
    $('.reset').on('click', reset);

    /////////////////////////////////////REMOVE BEFORE RELEASE//////////////////////////
    $('.accuracy').on('click', function() {
       $('.card').toggleClass('backFlip');
    });
    ///////////////////////////////////////////////////////////////////////////////////
});
var totalCards = 0;
var cardCount = 0;
var timesPlayed = -1;
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
var pickAnotherCard = true;
var chanceOfRemembering = 10;


function reset() {
    playerOne = true;
    timesPlayed++;
    $('.card').removeClass('backFlip').css('transition', '1s');
    $('.card').find('.front').removeClass('foundCard compFoundCard').css('transition', '2s');
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
    compMemory = [];
    $('.timesPlayed').text(timesPlayed);
    $('.accuracy').text(accuracy.toFixed(1) + '%');
    $('.tryCount').text(tryCount);

    /////////////////////////////////////////////////////////
        var staticImgArray = [
            'images/engineer.png',
            'images/green_energy.png',
            'images/microscope.png',
            'images/miner2.png',
            'images/nuclearExplosion.png',
            'images/plutoniumAtom.png',
            'images/radioactive.png',
            'images/rocketsicon.png',
            'images/powerPlant.png',
            'images/engineer.png',
            'images/green_energy.png',
            'images/microscope.png',
            'images/miner2.png',
            'images/nuclearExplosion.png',
            'images/plutoniumAtom.png',
            'images/radioactive.png',
            'images/rocketsicon.png',
            'images/powerPlant.png'
        ];
        var imgArr = staticImgArray.slice();
        var staticCardArr = [1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9];
        var cardArr = staticCardArr.slice();

        var cards = $('.row').find('.card .front')
        for (var i=0;i<cards.length;i++) {
            var randomNum = Math.floor((Math.random() * cardArr.length));
            $(cards[i]).css({
                'background-image': 'url('+imgArr[randomNum]+')',
                'background-position': 'center',
                'background-size': '140%'
            }).attr('compare', cardArr[randomNum]);
            cardArr.splice(randomNum, 1);
            imgArr.splice(randomNum, 1);
        }
}
function cardHandler() {
    if (cardCount === 0 && playerOne === true) {
        //if it's the first card store that card and increase card count to 1
        firstCard = $(this);
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
        compare();
    }

}

function compare() {
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
            if (playerOne === true) {
                accuracy = (matchCount / totalCards) * 100;
                $('.accuracy').text(accuracy.toFixed(1) + '%');
            }
            playerOne = false;
            $('.turn').text('CPU\'s Turn').css({
                'color': 'red',
                'transition': '1s',
            });
            cpu();
        }, 1000);
    }
}

////////////////AI implementation//////////////////////////////////////////////////
function cpu() {
    if (playerOne !== true) {
        setTimeout(function () {
            pickAnotherCard = true;
            //Store the cards it has seen into computer memory
            var compMemoryRandomNum = Math.floor((Math.random() * 10) + 1);
            if (compMemoryRandomNum <= chanceOfRemembering) {
                compMemory.push(first, second);
            }
            //Pick a card randomly and flip it
            var cardsNotFlipped = $('.card').not('.backFlip');
            var randomCard = Math.floor((Math.random() * cardsNotFlipped.length));
            var compCard = cardsNotFlipped[randomCard];
            $(compCard).addClass('backFlip');
            //look at the cards compare value, if it exists in the computers memory, find it
            first = $(compCard).find('.front').attr('compare');

            setTimeout(function () {
                var seenCard = 0;
                for (var i = 0; i < compMemory.length - 1; i++) {
                    if (compMemory[i] == first) {
                        seenCard++;
                    }
                    if (compMemory[i] == first && seenCard === 2) {

                        $('[compare=' + first + ']').parent().addClass('backFlip');
                        $('[compare=' + first + ']').addClass('compFoundCard');
                        playerOne = false;
                        pickAnotherCard = false;
                        seenCard = 0;
                        cpu();
                        break;
                    }
                    playerOne = true;
                }
            }, 1000);


            setTimeout(function () {
                cardsNotFlipped = $('.card').not('.backFlip');
                randomCard = Math.floor((Math.random() * cardsNotFlipped.length));
                if (pickAnotherCard === true) {
                    $(cardsNotFlipped[randomCard]).addClass('backFlip');
                    var second = $(cardsNotFlipped[randomCard]).find('.front').attr('compare');
                    if (compMemoryRandomNum <= chanceOfRemembering) {
                        compMemory.push(first);
                        compMemory.push(second);
                    }
                    if (first == second) {
                        $('[compare=' + first + ']').addClass('compFoundCard');
                        playerOne = false;
                        cpu();

                    }
                    else {

                        setTimeout(function () {
                            playerOne = true;
                            $('[compare=' + first + ']').parent().removeClass('backFlip');
                            $('[compare=' + second + ']').parent().removeClass('backFlip');
                            $('.turn').text('Your Turn!').css({
                                'color': 'green',
                                'transition': '2s',
                            })

                        }, 1000);
                    }
                }
            }, 1000);
        }, 1000);
    }
}