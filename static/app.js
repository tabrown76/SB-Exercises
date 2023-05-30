$(document).ready(function() {
    const $form = $('.cupcake-form');
    const $cupcakeList = $('.cupcake-container ul');

    // Function to add a cupcake to the list
    function addCupcake(cupcake) {
        let $li = $('<li>');
        $li.text(`Flavor: ${cupcake.flavor}, Size: ${cupcake.size}, Rating: ${cupcake.rating}`);
        $li.append(`<img src="${cupcake.image}" alt="Cupcake Image">`);
        $cupcakeList.append($li);
    }

    // Get all cupcakes and add to the list
    async function getCupcakes() {
        let response = await axios.get('/api/cupcakes');
        for (let cupcake of response.data.cupcakes) {
            addCupcake(cupcake);
        }
    }

    getCupcakes();

    // Handle form submission
    $form.on('submit', async function(e) {
        e.preventDefault();

        let flavor = $('#flavor').val();
        let size = $('#size').val();
        let rating = $('#rating').val();
        let image = $('#image').val();

        let response = await axios.post('/api/cupcakes', {flavor, size, rating, image});

        addCupcake(response.data.cupcake);

        // reset form fields
        $form.trigger('reset');
    });
});
