/**
 * Created by gaowe on 2015/11/17.
 */
angular.module('homeservice.orders',[])
  //订单
  .controller('orders', function ($scope, ORDERS,$state) {
    console.log('orders');
    $scope.orderfunction=function(button_function)
    {
      if(button_function=='payorder')
      {
        $state.go('tab.order_detail_order',{orderid:1});
      }

    }
    $scope.Orders = ORDERS.getOrders(1);
  })
  .controller('orderdetail',function($scope,ORDERS,$stateParams){
    var orderid=$stateParams.orderid;
    console.log(orderid);
    $scope.orderInfo=ORDERS.getOrderbyOrderID(orderid);
})
;
