// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('homeservice',
  ['ionic', 'ngResource','homeservice.controllers','homeservice.services','homeservice.common',
    'homeservice.homepage','homeservice.orders','homeservice.usercenter','homeservice.config'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
  .config(function($ionicConfigProvider)
  {
    $ionicConfigProvider.tabs.position('bottom');
  })


.config(function($stateProvider,$urlRouterProvider)
  {
    console.log('config');
    $stateProvider
      //tab页面
      .state('tab',{
        url:'/tab',
        abstract:true,
        templateUrl:'views/tabs.html'
      })
      //主页
      .state('tab.homepage',{
        url:'/homepage',
        views:{
          'tab-homepage':{
            templateUrl:'views/homepage/tab_homepage.html',
            controller:'homepage'
          }
        }
      })

      //订单中心
      .state('tab.orders',{
        url:'/orders',
        views:{
          'tab-orders':{
            templateUrl:'views/order/tab_orders.html',
            controller:'orders'
          }
        }
      })

      //个人中心
      .state('tab.usercenter',{
        url:'/usercenter',
        abstract:false,
        views:{
          'tab-usercenter':{
            templateUrl:'views/usercenter/tab_usercenter.html',
            controller:'usercenter'
          }
        }
      })
      //登陆界面
      .state('tab.userlogin',{
        url:'/usercenter/userlogin',
        views:{
          'tab-usercenter':{
            templateUrl:'views/usercenter/userlogin.html',
            controller:'userlogin'
          }
        }
      })
    //业务计划列表
      .state('tab.serviceplanlist',
      {
        url:'/homepage/serviceplanlist/:serviceid/:servicename',
        views:{
          'tab-homepage':{
            templateUrl:'views/homepage/serviceplanlist.html',
            controller:'serviceplanlist'
          }
        }
      })

      //价格计划
      .state('tab.rateplan',
      {
        url:'/homepage/rateplan/:serviceid/:servicename',
        views:{
          'tab-homepage':{
            templateUrl:'views/homepage/hp_rateplan.html',
            controller:'rateplan'
          }
        }
      })
      //却认订单
      .state('tab.confirmorder_01',
      {
        url:'/homepage/confirmorder_01/:serviceid/:serviceplan_id/:servicename/:rateplanid',
        views:{
          'tab-homepage':{
            templateUrl:'views/homepage/confirmplacedate.html',
            controller:'confirmorder_01'
          }
        }
      })
      //订单详情--订单页
      .state('tab.order_detail_order',
      {
        url:'/orders/order_detail_order/:orderid',
        views:{
          'tab-orders':{
            templateUrl:'views/order/order_detail.html',
            controller:'orderdetail'
          }
        }
      })
      //订单详情--下单页
      .state('tab.order_detail_homepage',
      {
        url:'/homepage/order_detail_homepage/:orderid',
        views:{
          'tab-homepage':{
            templateUrl:'views/order/order_detail.html',
            controller:'orderdetail'
          }
        }
      })
      //地址定位
      .state('tab.locatesite',{
        url:'/homepage/locatesite',
        views:{
          'tab-homepage':{
            templateUrl:'views/common/locatesite.html',
            controller:'locatesite'
          }
        }
      }
    )
      //选择服务时长和时间段
      .state('tab.selectservicetime',{
        url:'/homepage/selectservicetime',
        views:{
          'tab-homepage':{
            templateUrl:'views/homepage/selectservicetime.html',
            controller:'selectservicetime'
          }
        }
      }
    )
      .state('tab.serviceplacelist',{
        url:'/serviceplacelist',
        views:{
          'tab-usercenter':{
            templateUrl:'views/common/serviceplacelist.html',
            controller:'serviceplacelist'
          }
        }
      })
      .state('tab.serviceplacelist_select',{
        url:'/serviceplacelist_select',
        views:{
          'tab-homepage':{
            templateUrl:'views/common/serviceplacelist.html',
            controller:'serviceplacelist_select'
          }
        }
      })
      .state('tab.addnewplace',{
        url:'/addnewplace',
        views:{
          'tab-homepage':{
            templateUrl:'views/common/addnewplace.html',
            controller:'addnewplace'
          }
        }
      });
    console.log('hahah');
    $urlRouterProvider.otherwise('/tab/homepage');
  })
  //隐藏tab
  .directive('hideTabs', function($rootScope) {
    return {
      restrict: 'A',
      link: function(scope, element, attributes) {
        scope.$on('$ionicView.beforeEnter', function() {
          scope.$watch(attributes.hideTabs, function(value){
            $rootScope.hideTabs = value;
          });
        });

        scope.$on('$ionicView.beforeLeave', function() {
          $rootScope.hideTabs = false;
        });
      }
    };
  })
  .directive('focusMe', function($timeout) {
    return {
      scope: { trigger: '=focusMe' },
      link: function(scope, element) {
        scope.$watch('trigger', function(value) {
          if(value === true) {
            //console.log('trigger',value);
            //$timeout(function() {
            element[0].focus();
            scope.trigger = false;
            //});
          }
        });
      }
    };
  })
  .directive('appMap', function () {
    return {
      restrict: "E",
      replace: true,
      template: "<div id='allmap'></div>",
      scope: {
        center: "=",		// Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
        markers: "=",	   // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
        width: "@",		 // Map width in pixels.
        height: "@",		// Map height in pixels.
        zoom: "@",		  // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
        zoomControl: "@",   // Whether to show a zoom control on the map.
        scaleControl: "@",   // Whether to show scale control on the map.
        address: "@"
      },
      link: function (scope, element, attrs) {

      }
    }
  });

















