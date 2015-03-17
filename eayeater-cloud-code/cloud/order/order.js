
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
var Order = Parse.Object.extend("Order");
var OrderList = Parse.Object.extend('Orderlist');
var Menu = Parse.Object.extend('Menu');
//var Lookup = Parse.Object.extend("Lookup");

var Response = {
    EmptyParameters: 'Some parameters empty',
    InternalServerError: 'Oops! Some error occurred!',
    SaveSuccess: 'Order placed successfully!'
}


exports.save = function(params) {
 
    if(!params || !params.table_no || !params.name || !params.phone_no || !params.orders){
        params.error(Response.EmptyParameters);
    }else{
    	   var _orderList = [];
        	var order = new Order();
        	order.set("table_no",params.table_no);
        	order.set("name",params.name);
        	order.set("phone_no",params.phone_no);

        	
          	order.save(null, {
            success: function(order) {
              params.orders.forEach(function(o){
                var menuId = o.menuId;
                var menu = new Menu();
                menu.id = menuId;

                var quantity = o.quantity;

                var orderList = new OrderList();
                orderList.set('menu', menu);
                orderList.set('order', order);
                orderList.set('quantity', quantity);
                _orderList.push(orderList);
                //CALCULATE AMOUNT IN BEFORE SAVE
              });
              Parse.Object.saveAll(_orderList, {
                success: function() {
                  params.success(Response.SaveSuccess);
                },
                error: function() {
                  params.error(Response.InternalServerError)
                }
              });
               
            },
             error: function(error) {
                  params.error(error + "error ");
             }
            });



    } 
}

