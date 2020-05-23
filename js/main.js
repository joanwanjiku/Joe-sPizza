// Business Logic
function Order(name,size,crust,toppings, delivery){
    this.name = name;
    this.pizzaSize = size;
    this.pizzaCrust = crust;
    this.pizzaToppings = toppings;    
    this.delivery = delivery;
    this.price = 0;

}
Order.prototype.determinePrice = function(){	
    this.price += pizzaSizePrice(this.pizzaSize);
    this.price += pizzaCrustprice(this.pizzaCrust);
    this.pizzaToppings.forEach((topping) => {
    	this.price += pizzaToppingsPrice(topping);
    });
    return this.price
};
Order.prototype.determinePricePlusDelivery = function(){
    this.price += pizzaSizePrice(this.pizzaSize);
    this.price += pizzaCrustprice(this.pizzaCrust);
    this.pizzaToppings.forEach((topping) => {
    	this.price += pizzaToppingsPrice(topping);
    });
    this.price += 100
    return this.price
};


function pizzaSizePrice(size){
    if (size == 'Big'){
  	    return 500;
    } else if(size == 'Medium'){
  	    return 350;
    } else{
  	    return 250;
    }
};
function pizzaCrustprice(crust){
	if (crust == 'glutenFree'){
  	    return 50
    } else if(crust == 'crusty'){
  	    return 35
    } else{
  	    return 25
    }
};

function pizzaToppingsPrice(topping){
	if (topping == 'mushrooms'){
  	    return 0
    }
    if (topping == 'pepperoni'){
  	    return 15
    }
    if (topping == 'beef'){
  	    return 5
    }
    if (topping == 'blackOlives'){
  	    return 20
    }
};

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
   
    $('input[name="deliveryOptions"]').click(function(){      
        var inputValue = $(this).attr('value');
        if(inputValue == 'true') {
            $('#locationDiv').show();           
            $('#location').focusout(function() {
                if($('#location').val() === ''){
                    $('#location').addClass('is-invalid');            
                    $('.lctError').show();
                }else{
                    $('.lctError').hide();
                    $('#location').removeClass('is-invalid');          
                }
            });                      
        }else{
            $('#locationDiv').hide();
        }   
    });
    

    $('#orderForm').submit(function(e){
        e.preventDefault();
        var name = $('#name').val();
        var pizza = $('#pizza').val();
        var selectedCrust = $("input[name='crustType']:checked").val();
        var selectedToppings = [];
        var deliveryOption = $("input[name='deliveryOptions']:checked").val();       
        var deliveryAddress = $('#location').val();
        var orders = []

        $.each($("input[name='topping']:checked"),function(){
            selectedToppings.push($(this).val())
        });

        var newOrder = new Order(name, pizza, selectedCrust, selectedToppings, deliveryOption)
        orders.push(newOrder)
        orders.forEach((order) => {
            console.log(order)
            $('#PizzaList').append(` <li>
            <h5>${order.name}</h5>
                    <p class="col-sm-10 m-0" >Size: <span style="font-weight:bold;">${order.pizzaSize}</span></p>
                    <p class="col-sm-10 m-0" >Crust: <span style="font-weight:bold;">${order.pizzaCrust}</span></p>
                    <p class="col-sm-10 m-0" >Toppings: <span style="font-weight:bold;">${order.pizzaToppings}</span></p>
                    <p class="col-sm-10 m-0" >Price: <span style="font-weight:bold;">${order.determinePrice()}</span></p>                                        
        </li>
        `)
        })


        // if(newOrder[deliveryOption] == true){
        //     console.log(newOrder.determinePricePlusDelivery());
        // }else {
        //     newOrder.determinePrice();

        // }
        
    });
});