// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('homeservice', ['ionic','homeservice.controllers','homeservice.services'])

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
        templateUrl:'templates/tabs.html'
      })
      //主页
      .state('tab.homepage',{
        url:'/homepage',
        views:{
          'tab-homepage':{
            templateUrl:'templates/tab_homepage.html',
            controller:'homepage'
          }
        }
      })

      //订单中心
      .state('tab.orders',{
        url:'/orders',
        views:{
          'tab-orders':{
            templateUrl:'templates/tab_orders.html',
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
            templateUrl:'templates/tab_usercenter.html',
            controller:'usercenter'
          }
        }
      })
      //登陆界面
      .state('tab.userlogin',{
        url:'/usercenter/userlogin',
        views:{
          'tab-usercenter':{
            templateUrl:'templates/userlogin.html',
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
            templateUrl:'templates/serviceplanlist.html',
            controller:'serviceplanlist'
          }
        }
      })

      //价格计划
      .state('tab.rateplan',
      {
        url:'/homepage/rateplan/:serviceid/:serviceplan_id/:servicename',
        views:{
          'tab-homepage':{
            templateUrl:'templates/hp_rateplan.html',
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
            templateUrl:'templates/confirmplacedate.html',
            controller:'confirmorder_01'
          }
        }
      })
    ;
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
  });
















