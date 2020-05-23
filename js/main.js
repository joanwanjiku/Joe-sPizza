$(document).ready(function(e){
    
    $('#location').hide();
   
    $("input[name='deliveryOptions']").change(function(){      
        var inputValue = Boolean($(this).attr("value"));
        if(inputValue) {
            $('#location').show();
            // if($('#location').val() == ''){

            // }          
        }else{
            $('#location').hide();
        }   
    });
    

    $('#orderForm').submit(function(e){
        e.preventDefault();
        var name = $('#name').val();
        var pizza = $('#pizza').val();
        var selectedCrust = $("input[name='crustType']:checked").val();
        var selectedToppings = [];
        var deliveryAddress = $('#location').val();

        $.each($("input[name='topping']:checked"),function(){
            selectedToppings.push($(this).val())
        });
        console.log(add)
    });
});