$(document).ready(function() {
$('.card').on('click', cardHandler);
$('header').on('click', rotateBack);
});


function cardHandler() {
    $(this).addClass('backFlip');
}

function rotateBack() {
    $('.card').removeClass('backFlip').css('transition','1s');
}

