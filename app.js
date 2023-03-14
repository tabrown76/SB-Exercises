$(function(){
    console.log("Let's get ready to party with jQuery!");
})

$('img').addClass('image-center');

$('p').eq(5).remove();

$('title').css('fonts-size', function(){
    return Math.floor(Math.random() * 100);
}) //is changing the font size of the title actually a thing?

$('ol').append('<li>whatever you want</li>');

$('ol').remove();
$('h4').append('<p>Sorry.</p>')

$('input').on('change', function(){
    let red = $('#red').val();
    let green = $('#green').val();
    let blue = $('#blue').val();
    $('body').css('background-color', 'rgb(' + red + ', ' + green + ', ' + blue + ')');
})

$('img').on('click', function(){
    $(this).remove();
})