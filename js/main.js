


$(document).ready(function(){
    $('#orderForm').submit(function(e){
        e.preventDefault();
        var name = $('#name').val();
        var pizza = $('#pizza').val();
        var selectedCrust = $("input[name='crustType']:checked").val();
        var selectedToppings = [];
        $.each($("input[name='topping']:checked"),function(){
            selectedToppings.push($(this).val())
        });
        console.log(`${name}, ${pizza}, ${selectedCrust},  ${ selectedToppings.length} `)
    });
});