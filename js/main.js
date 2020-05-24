// Business Logic
function Order(name,size,crust,toppings){
    this.name = name;
    this.pizzaSize = size;
    this.pizzaCrust = crust;
    this.pizzaToppings = toppings;    
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



function pizzaSizePrice(size){
    if (size == 'Big'){
  	    return 500;
    }
    if(size == 'Medium'){
  	    return 350;
    }
    if (size == 'Small'){
  	    return 250;
    }
};
function pizzaCrustprice(crust){
	if (crust == 'glutenFree'){
  	    return 50
    }
    if(crust == 'crusty'){
  	    return 35
    }
    if (crust == 'stuffed'){
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
    
    $('#checkOutForm').hide();
    var pizzaOrders = [];

    $('#orderForm').submit(function(e){
        e.preventDefault();
        var name = $('#name').val();
        var pizza = $('#pizza').val();
        var selectedCrust = $("input[name='crustType']:checked").val();
        var selectedToppings = [];

        $.each($("input[name='topping']:checked"),function(){
            selectedToppings.push($(this).val())
        });

        var order = new Order(name, pizza, selectedCrust, selectedToppings)
            $('#PizzaList').append(` <li>
            <h5>${order.name}</h5>
                    <p class="col-sm-10 m-0" >Size: <span style="font-weight:bold;">${order.pizzaSize}</span></p>
                    <p class="col-sm-10 m-0" >Crust: <span style="font-weight:bold;">${order.pizzaCrust}</span></p>
                    <p class="col-sm-10 m-0" >Toppings: <span style="font-weight:bold;">${order.pizzaToppings}</span></p>
                    <p class="col-sm-10 m-0" >Price: <span style="font-weight:bold;">${order.determinePrice()}</span></p>                                        
        </li>`)
        pizzaOrders.push(order.price)

        $('#checkOutForm').show();    
    });   

    $("#resetBtn").click(function(){
        $("#orderForm")[0].reset();
    });

    $('#checkOutForm').submit(function(e) {
        e.preventDefault();
        var deliveryOption = $("input[name='deliveryOptions']:checked").val(); 
        var totalPrice;
        var deliveryAddress;
        if(deliveryOption == "true"){
            deliveryAddress = $('#location').val();
            pizzaOrders.push(100)
            totalPrice = pizzaOrders.reduce((x,y) => x + y, 0)
            $("#numberOfpizzas").text(pizzaOrders.length - 1);
            $("#totalAmount").text(totalPrice)
            $("#address").text(deliveryAddress);            
        }else {
            totalPrice = pizzaOrders.reduce((x,y) => x + y, 0)
            $("#numberOfpizzas").text(pizzaOrders.length);
            $("#totalAmount").text(totalPrice)
            $("#address").text("Pick Up");
        }  
    });    

    // Order Part
    $('#finalOrder').hide();
    var orders = 0;
    $('#confirmOrder').click(function() {
        $('#finalOrder').show();
        orders += 1;
        $('#orderNum').text(orders)
        if ($("#address").text() == "Pick Up") {
            $('#finalOrder p').text("We have received your order it will be ready for pickup after 50 minutes")
        }else {
            $('#finalOrder').html(`<h2>Orders <span class="badge badge-success" id="orderNum">1</span> </h2><p class="orderMessage">We have received your order, it will be delivered to <span style ="font-weight:bold;"> ${$("#address").text()}</span> in the next 2 hours</p`)
        }
        
    })

});
