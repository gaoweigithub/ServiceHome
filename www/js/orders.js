/**
 * Created by gaowe on 2015/11/17.
 */
angular.module('homeservice.orders',[])
  //订单
  .controller('orders', function ($scope, ORDERS) {
    console.log('orders');
    $scope.Orders = ORDERS.getOrders(1);
  })
;
