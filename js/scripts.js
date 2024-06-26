$(document).ready(function () {
  $(".card-1").hover(function(){
    $(this).animate({opacity:'1'});
  }, function() {
    $(this).animate({opacity:'0'});
  });  
    
  $('#mc-embedded-subscribes').click(function () {
    var name = document.getElementById("names").value;
    alert("Hey " + name + ". We have received your order. It will incur an additional charge of 170/= for delivery. See you in 30 mins!");
  });  
    
  $('#mc-embedded-subscribe').click(function () {
    var name = document.getElementById("mce-NAME").value;
    alert("Hey " + name + ". We have received your details. Thank you for reaching us!");
  });
});

// Business Logic
// Objects
function Customer(name){
  this.name = name;
  this.order = []; // Array of pizzas
  this.orderCost = 0; // Sum of pizza costs
}

function Pizza(size, toppings){
  this.size = size;
  this.toppings = toppings;
  this.numberOfToppings;
  this.cost;
}

// Prototypes
Pizza.prototype.countToppings = function () {
  this.numberOfToppings = this.toppings.length;
}

Pizza.prototype.singlePieCost = function () {
  var toppingCost = this.numberOfToppings * this.toppingPrice();

  if (this.size === "small"){
    this.cost = 250 + toppingCost;
  } else if (this.size === "medium"){
    this.cost = 500 + toppingCost;
  } else if (this.size === "large") {
    this.cost = 1000 + toppingCost;
  } else {
    this.cost = 0; // Handle case where size is not selected
  }
}

Pizza.prototype.toppingPrice = function () {
  if (this.size === "small") {
    return 50;
  } else if (this.size === "medium") {
    return 75;
  } else if (this.size === "large") {
    return 100;
  } else {
    return 0;
  }
}

// UI Logic
$(document).ready(function(){
  // Add Another Pizza
  $("#add-pizza-button").click(function(){
    $(".additional-pizzas").append('<div class="new-pizza">'
                                  + '<div class="form-group">'
                                  + '<h5> Choose Your Size: </h5>'
                                  + '<select class="pizza-size-input">'
                                  + '<option value= ""></option>'
                                  + '<option value = "small">Small</option>'
                                  + '<option value = "medium">Medium</option>'
                                  + '<option value = "large">Large</option>'
                                  + '</select>'
                                  + '</div><br>'
                                  + '<div class="pizza-toppings" class="form-group">'
                                  + '<h5>Choose Your Toppings (All pies include tomato sauce and mozzarella cheese for no extra cost): </h5>'
                                  + '<input type="checkbox" name="topping" value="bell-peppers">  Bell Peppers<br>'
                                  + '<input type="checkbox" name="topping" value="mushrooms">  Mushrooms<br>'
                                  + '<input type="checkbox" name="topping" value="spinach">  Spinach<br>'
                                  + '<input type="checkbox" name="topping" value="artichokes">  Artichokes<br>'
                                  + '<input type="checkbox" name="topping" value="chicken">  Chicken<br>'
                                  + '<input type="checkbox" name="topping" value="pepperoni">  Pepperoni<br>'
                                  + '<input type="checkbox" name="topping" value="sausage">  Sausage<br>'
                                  + '<input type="checkbox" name="topping" value="pesto">  Pesto<br>'
                                  + '<input type="checkbox" name="topping" value="bbq-sauce">  BBQ Sauce<br>'
                                  + '<input type="checkbox" name="topping" value="feta-cheese">  Feta Cheese<br>'
                                  + '</div><hr>'
                                  + '</div>');
  }); // Click function close

  // Submit Order Pizza Form
  $("form.order-form").submit(function(event){
    event.preventDefault();
    var nameInput = $("#customer-name-input").val();
    var customerOne = new Customer(nameInput);

    // New Pizza Loop for multiple pizzas to collect size and toppings inputs for each pizza
    $(".new-pizza").each(function(){
      var sizeInput = $(this).find(".pizza-size-input").val();
      var toppingsInput = [];
      $(this).find(".pizza-toppings input:checkbox[name=topping]:checked").each(function(){
        toppingsInput.push($(this).val()); // Push toppings to toppingsInput array
      });
      var newPizza = new Pizza(sizeInput, toppingsInput);
      customerOne.order.push(newPizza); // Populates array of pizzas for customer order property

      // Call prototypes to calculate order cost of newPizza
      newPizza.countToppings();
      newPizza.singlePieCost();
      customerOne.orderCost += newPizza.cost; // Updates customer's order cost
    }); // New pizza loop close

    // Display order details
    $(".output").show();
    $(".output-name").text(customerOne.name);
    $(".output-order").empty(); // Clear previous orders
    for (var i = 0; i < customerOne.order.length; i++) {
      $(".output-order").append("One " + customerOne.order[i].size + " pizza with " + customerOne.order[i].numberOfToppings + " toppings." + '<br>');
    }
    $(".output-order-total").text(customerOne.orderCost + " Ksh"); // Display total order cost

    // Clear fields
    $(".additional-pizzas").empty(); // Clear additional pizza fields
    this.reset(); // Reset form
  }); // Order form submit close
}); // Doc ready close
