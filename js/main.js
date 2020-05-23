// Business Logic

$(document).ready(function(){
    // UI Logic
    // Validations

    // Name and Size validations
    $('.sizeError').hide();
    $('.nameError').hide();
    $('#name').focusout(function() {
        if($(this).val() == ''){
            $('.nameError').show();    
            $(this).addClass("is-invalid")

        }else{
            $('.nameError').hide();    
            $(this).removeClass("is-invalid")
        }
    });
    $('#pizza').focusout(function() {
        if($(this).val() == '-Select--'){
            $('.sizeError').show();
            $(this).addClass("is-invalid");
        }else{
            $('.sizeError').hide();
            $(this).removeClass("is-invalid");
        }
    });

    // Delivery section validation
    $('#locationDiv').hide();
    $('.lctError').hide();
      
   
    $("input[name='deliveryOptions']").change(function(){      
        var inputValue = Boolean($(this).attr("value"));
        if(inputValue) {
            $('#locationDiv').show();           
            $('#location').focusout(function() {
                 console.log($(this).val());
                if($('#location').val() === ''){
                    $('#location').addClass('is-invalid');            
                    $('.lctError').show();
                }else{
                    $('.lctError').hide();
                    $('#location').removeClass('is-invalid');          
                }
            });                      
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