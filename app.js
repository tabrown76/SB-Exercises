const $img = $('.img');
const $input = $('#search-box');

$input.on('keyup', async function(e) {
    if (e.key === 'Enter' || e.type === 'click') {
        e.preventDefault();
        let inputVal = $input.val();
        $input.val("");

        const res = await axios.get('https://api.giphy.com/v1/gifs/search', {
            params: {
                api_key: "hfLUAMGdCueMRLiSN6eE7IKKpcZDJMqu",
                q: inputVal
            }
        });
        console.log(res);
        makeCard(res.data)
    }
});

$('#search-btn').on('click', function(e) {
    $input.trigger('keyup', e);
});


function makeCard(res){
    let resLength = res.data.length;
    if(resLength){
        let random = Math.floor(Math.random() * resLength);
        let $newDiv = $('<div>', {class: "col"});
        let $newImg = $('<img>', {
            src: res.data[random].images.fixed_height.url,
        });
        $newDiv.append($newImg);
        $img.append($newDiv);
    }
}

$('#delete').on('click', function(){
    $img.empty();
})