$(document).ready(function() {

    reset();
    // $('.card').on('click', cardHandler);
    //
    const card = document.getElementsByClassName("card");
    //attach click handlers
    for (let i = 0; i < card.length; i++) {
        card[i].addEventListener('click', cardHandler);
    }
    //
    // $('body').on('click','.reset' ,reset);
    //
    document.getElementsByClassName("reset")[0].addEventListener('click', reset);
    //
    // $('.settings').on('click', changeSettings);
    //
    document.getElementsByClassName("settings")[0].addEventListener('click', changeSettings);
    //

    /////////////////////////////////////REMOVE BEFORE RELEASE//////////////////////////
    $('.accuracy').on('click', function() {
       $('.card').toggleClass('backFlip');
    });
    ///////////////////////////////////////////////////////////////////////////////////

//Close the modal when the X is clicked
//     $('.close').on('click', function() {
//         $('.modal').css('display', 'none');
//         $(".modal-body").html("");
//         $(".modal-footer").html("");
//     });
    //
    document.getElementsByClassName("close")[0].addEventListener('click', function() {
        document.getElementsByClassName("modal")[0].style.display = 'none';
        document.getElementsByClassName("modal-body")[0].innerHTML = '';
        document.getElementsByClassName("modal-footer")[0].innerHTML = '';
    });
    //
    // $('body').on('click', '.reset' ,function() {
    //     $('.modal').css({
    //         'display': 'none',
    //         'transition': '1s'
    //     });
    // });
    document.getElementsByClassName("reset")[0].addEventListener('click', function() {
        const modal = document.getElementsByClassName("modal")[0];
        modal.style.display = 'none';
        modal.style.transition = '1s';

    });
//Close the modal when the user click anywhere other than the modal
    window.onclick = function(event) {
        if (event.target == document.querySelector('.modal')) {
            // $('.modal').css('display', 'none');
            // $(".modal-body").html("");
            // $(".modal-footer").html("");
            //
            document.getElementsByClassName('modal')[0].style.display = 'none';
            document.getElementsByClassName('modal-body')[0].innerHTML = '';
            document.getElementsByClassName('modal-footer')[0].innerHTML = '';
            //
        }
    }
});
var totalCards = 0;
var cardCount = 0;
var timesPlayed = -1;
var tryCount = 0;
var accuracy = 0;
var matchCount = 0;
var compTotalCards = 0;
var compMatchCount = 0;
var compAccuracy = 0;
var first;
var second;
var firstCard;
var secondCard;
var disqualCount;
var playerOne = true;
var compMemory = [];
var pickAnotherCard = true;
var chanceOfRemembering = 8;



function reset() {
    // $('.modal').css('display', 'none');
    //
    document.querySelector('.modal').style.display = 'none';
    //
    // $(".modal-body").html("");
    //
    document.querySelector('.modal-body').innerHTML = '';
    //
    // $(".modal-footer").html("");
    //
    document.querySelector('.modal-footer').innerHTML = '';
    //
    playerOne = true;
    timesPlayed++;
    // $('.card').removeClass('backFlip').css('transition', '1s');
    //
    // document.querySelector('.card').classList.remove('backFlip');
    let cardArray = document.querySelectorAll('.card');
    for (let i = 0; i < cardArray.length; i++) {
        cardArray[i].style.transition = '1s';
        cardArray[i].childNodes[1].classList.remove('foundCard', 'compFoundCard');
        cardArray[i].classList.remove('backFlip', 'seen');
        cardArray[i].style.transition = '1s';
    }

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
    compMatchCount = 0;
    compTotalCards = 0;
    compAccuracy = 0;
    // $('.userPoints, .compPoints').text('0');
    //
    document.querySelector('.userPoints').innerHTML = '0';
    document.querySelector('.compPoints').innerHTML = '0';
    //
    // $('.timesPlayed').text(timesPlayed);
    //
    document.querySelector('.timesPlayed').innerHTML = '' + timesPlayed;
    //
    // $('.accuracy, .compAccuracy').text(accuracy.toFixed(1) + '%');
    //
    document.querySelector('.accuracy').innerHTML = accuracy.toFixed(1) + '%';
    document.querySelector('.compAccuracy').innerHTML = accuracy.toFixed(1) + '%';
    //
    // $('.tryCount').text(tryCount);
    //
    document.querySelector('.tryCount').innerHTML = tryCount + '';
    //

    /////////////////////////////////////////////////////////
        const staticImgArray = [
            'images/engineer.png',
            'images/nuclearFusion.png',
            'images/microscope.png',
            'images/miner2.png',
            'images/nuclearExplosion.png',
            'images/plutoniumAtom.png',
            'images/radioactive.png',
            'images/rocketsicon.png',
            'images/powerPlant.png',
            'images/engineer.png',
            'images/nuclearFusion.png',
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

        // var cards = $('.row').find('.card .front');
        var cards = document.querySelectorAll('.front');

        for (var i=0;i<cards.length;i++) {
            var randomNum = Math.floor((Math.random() * cardArr.length));
            cards[i].style.backgroundImage = 'url('+imgArr[randomNum]+')';
            cards[i].style.backgroundPosition = 'center';
            cards[i].style.backgroundSize = '140%';
            cards[i].setAttribute('compare', cardArr[randomNum] + '');
            cardArr.splice(randomNum, 1);
            imgArr.splice(randomNum, 1);
        }
}
function cardHandler(event) {
    if (cardCount === 0 && playerOne === true) {
        //if it's the first card store that card and increase card count to 1

        firstCard = event.target;
        first = firstCard.parentNode.firstElementChild.getAttribute('compare');
        console.log('first ', first);
        console.log(firstCard.parentNode.firstElementChild);
        // console.log(firstCard.parentNode.firstElementChild);
        firstCard.parentNode.classList.add('backFlip');
        cardCount++;
    }
    else if (cardCount === 1) {
        //if its the second card store that card and we'll perform a conditional check
        // secondCard = $(this);
        secondCard = event.target;
        second = secondCard.parentNode.firstElementChild.getAttribute('compare');
        if (secondCard.parentNode.firstElementChild.classList.contains('backFlip')) {
            cardCount = 1;
            return;
        }
        console.log('second ', second);
        console.log(secondCard.parentNode.firstElementChild);
        secondCard.parentNode.classList.add('backFlip');
        totalCards++;
        cardCount++;
        document.querySelector('.tryCount').innerHTML = totalCards + '';
        compare();
    }

}

function compare() {
    if (first === second) {
        //if the cards match things match here and card count get's reset to 0
        setTimeout(function() {
            // firstCard.find('.front').addClass('foundCard');
            // secondCard.find('.front').addClass('foundCard');
            firstCard.parentNode.firstElementChild.classList.add('foundCard');
            secondCard.parentNode.firstElementChild.classList.add('foundCard');
            console.log('matched!!!!!!!!!');
            cardCount = 0;
        }, 500);
        matchCount++;
        accuracy = (matchCount / totalCards) * 100;
        // $('.accuracy').text(accuracy.toFixed(1) + '%');
        //
        document.querySelector('.accuracy').innerHTML = accuracy.toFixed(1) + '%';
        //

        if (first === second && compMatchCount+matchCount === 9) {
            ////////////////////////////////End of Game user last turn////////////////////////////////////////////////
            timesPlayed++;
            // $('.timesPlayed').text(timesPlayed);
            //
            document.querySelector('.timesPlayed').innerHTML = timesPlayed + '';
            //
            playerOne = true;
            whoWon();
        }
        setTimeout(function() {
            // $('.userPoints').text(matchCount);
            document.querySelector('.userPoints').innerHTML = matchCount + '';
        }, 1000);
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
            var cardsNotFlipped = $('.card').not('.backFlip, .seen');
            if(cardsNotFlipped.length === 0) {
                $('.card').removeClass('seen');
                cardsNotFlipped = $('.card').not('.backFlip, .seen');
            }
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
                    //////////////End the game if the comp finds the last card
                    if (compMemory[i] == first && seenCard === 2 && compMatchCount+matchCount === 8) {
                        $('[compare=' + first + ']').parent().addClass('backFlip');
                        $('[compare=' + first + ']').addClass('compFoundCard');
                        compMatchCount++;
                        compTotalCards++;
                        compAccuracy = (compMatchCount / compTotalCards) * 100;
                        $('.compAccuracy').text(compAccuracy.toFixed(1)+'%');

                        $('.compPoints').text(compMatchCount);
                        playerOne = true;
                        pickAnotherCard = false;
                        seenCard = 0;
                        whoWon();
                        return;

                    }
                    else if (compMemory[i] == first && seenCard === 2 && compMatchCount+matchCount !== 8) {
                        $('[compare=' + first + ']').parent().addClass('backFlip');
                        $('[compare=' + first + ']').addClass('compFoundCard');
                        compMatchCount++;
                        compTotalCards++;
                        compAccuracy = (compMatchCount / compTotalCards) * 100;
                        $('.compAccuracy').text(compAccuracy.toFixed(1)+'%');
                        setTimeout(function() {
                            $('.compPoints').text(compMatchCount);
                        }, 1000);
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
                        compMatchCount++;
                        compTotalCards++;
                        compAccuracy = (compMatchCount / compTotalCards) * 100;
                        $('.compAccuracy').text(compAccuracy.toFixed(1)+'%');
                        setTimeout(function() {
                            $('.compPoints').text(compMatchCount);
                        }, 1000);
                        playerOne = false;
                        cpu();

                    }
                    else {

                        setTimeout(function () {
                            playerOne = true;
                            $('[compare=' + first + ']').parent().removeClass('backFlip').addClass('seen');
                            $('[compare=' + second + ']').parent().removeClass('backFlip').addClass('seen');
                            $('.turn').text('Your Turn!').css({
                                'color': 'lightGreen',
                                'transition': '1s',
                            });
                            compTotalCards++;
                            compAccuracy = (compMatchCount / compTotalCards) * 100;
                            $('.compAccuracy').text(compAccuracy.toFixed(1)+'%');

                        }, 1000);
                    }
                }
            }, 1000);
        }, 1000);
    }

}
function whoWon() {
    if (matchCount > compMatchCount) {
        //user wins
        var h1 = $('<h1>').text('You Win!');
        var content = $('<h2>').text('You have gathered more nuclear resources than your opponent. Nuclear domination is assured')
        $('.modal-body').append(h1,content);

    }
    if (matchCount < compMatchCount) {
        //comp wins
        var h1 = $('<h1>').text('You Lose.');
        var content = $('<h2>').text('Your opponent has gathered more nuclear resources and will have a larger arsenal than you.')
        $('.modal-body').append(h1,content);

    }
    else if (matchCount === compMatchCount) {
        //tie
        var h1 = $('<h1>').text('Tie');
        var content = $('<h2>').text('New nuclear resources have been discovered try again to break the stalemate')
        $('.modal-body').append(h1,content);

    }
    var resetBtn = $('<button>').addClass('reset').text('Play Again');
    $('.modal-footer').append(resetBtn);

    $('.modal').css('display', 'block');
}
///////////////////////////////////Settings////////////////////////////////////////////////////

function changeSettings () {
    var h1 = $('<h1>').text('Settings').css({'text-decoration': 'underline'})
    var h2 = $('<h2>').text('CPU difficulty').css('text-align', 'center');
    var btnDiv = $('<div>').addClass('buttonWrapper');
    var easyBtn = $('<button>').addClass('difficultyBtn easy').text('Easy');
    var mediumBtn = $('<button>').addClass('difficultyBtn medium').text('Medium');
    var hardBtn = $('<button>').addClass('difficultyBtn hard').text('Hard')
    $(btnDiv).append(easyBtn,mediumBtn,hardBtn);
    $('.modal-body').append(h1,h2,btnDiv);
    $('.modal').css('display', 'block');

    $('body').on('click','.easy', function() {
        chanceOfRemembering = 6;
        $('.difficulty').text('Easy');
        $('.modal').css('display', 'none');
        $(".modal-body").html("");
    });
    $('body').on('click','.medium', function() {
        chanceOfRemembering = 8;
        $('.difficulty').text('Medium');
        $('.modal').css('display', 'none');
        $(".modal-body").html("");
    });
    $('body').on('click','.hard', function() {
        chanceOfRemembering = 10;
        $('.difficulty').text('Hard');
        $('.modal').css('display', 'none');
        $(".modal-body").html("");
    });
}
/////////////////////////////////////////////////
// function flash() {
//     setInterval(function () {
//         if (playerOne === true) {
//             $('.turn').toggleClass('flash').css('transition', '1s');
//         }
//         console.log('Im here every 1 second');
//     }, 1000);
// }