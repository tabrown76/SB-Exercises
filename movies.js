const $submit = $('button').eq(0);

function validMovie(){
    let $movie = $('input').eq(0).val();

    if($movie.length < 2){
        alert('Please enter a valid movie title.');
        return false;
    }
    return true;
}

$submit.on('click', function(e){
    e.preventDefault();

    if(!validMovie()){
        return;
    };

    let $movie = $('input').eq(0).addClass('movie');
    let $rating = $('input').eq(1).addClass('rating');
    let newEntry = $('<div>').addClass('entry');
    let newM = $('<li>', {text: $movie.val()});
    let newR = $('<p>', {text: $rating.val() + ' Stars'});
    let newButton = $('<button>', {text: 'X'}).addClass('removal');

    newEntry.append(newM).append(newR).append(newButton);
    $('.movie-container').append(newEntry);
    $movie.val($movie.prop('defaultValue'));
    $rating.val($rating.prop('defaultValue'));
})

$('.movie-container').on('click', '.removal', function(){
    $(this).closest('.entry').remove();
})