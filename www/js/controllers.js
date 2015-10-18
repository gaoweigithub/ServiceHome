/**
 * Created by gaowe on 2015/10/7.
 */
angular.module('homeservice.controllers', [])

  //主页
  .controller('homepage', function ($rootScope, $scope, $ionicSlideBoxDelegate, $ionicModal, Advertisement, SERVICE, RATE_PLAN, CITIES) {
    $rootScope.UserData = {
      phone: '1',
      matchno: '2'
    }
    $rootScope.cityID = '1';
    $rootScope.cityName = "北京";
    console.log($rootScope.cityID);
    console.log('homepage');
    $scope.advs = Advertisement.getAllAdvs();

    $scope.BasicServices = SERVICE.getAllBasicServiceList();

    $ionicModal.fromTemplateUrl("modal.html", function (modal) {
        $scope.modal = modal;
      },
      {
        animation: 'slide-in-up',
        focusFirstInput: true
      });
  })
  .controller('ModalCtrl', function ($rootScope, $scope, $ionicModal, CITIES) {
    var locateCity = CITIES.getLocateCity();

    $scope.selectCityID = locateCity.cityid;
    $scope.selectCityName = locateCity.cityname;


    $scope.getOpenCityList = function () {
      return CITIES.getOpenCityList();
    };
    $scope.confirmLocate = function () {
      $rootScope.cityID = $scope.selectCityID;
      $rootScope.cityName = $scope.selectCityName;
      $scope.modal.hide();
    };
    //选中城市
    $scope.onTouchCity = function (cityid, cityname) {
      $scope.selectCityName = cityname;
      $scope.selectCityID = cityid;
      $scope.confirmLocate();
    };

    $scope.getLocateCity = function () {
      var locateCity = CITIES.getLocateCity();
      if (!isString(locateCity)) {
        $scope.selectCityID = locateCity.cityid;
        $scope.selectCityName = locateCity.cityname;
      }
    };

    $scope.reLocat = function () {
      console.log('relocate');

      if ($scope.selectCityID == -1) {
        console.log($scope.selectCityID);
        var locateCity = CITIES.reLocat();
        $scope.selectCityID = locateCity.cityid;
        $scope.selectCityName = locateCity.cityname;
      }
      else {
        $scope.confirmLocate();
      }
    }
  })
//订单
  .controller('orders', function ($scope) {
    console.log('orders');
  })

  //用户登录
  .controller('userlogin', function ($scope, $rootScope) {
    console.log('userlogin');
    //发送验证码
    $scope.sendConfirmNo = function () {
      console.log('sendmatchno');
    }
    //确认登录
    $scope.ConfirmLogin = function () {
      console.log('confirmlogin');
      $rootScope.UserData = {
        phone: 18612112092,
        matchno: 12345
      }
    }
  }
)
//个人中心
  .controller('usercenter', function ($scope, $rootScope) {
  })

//业务计划列表
  .controller('serviceplanlist', function ($scope, $stateParams, SERVICE) {
    var serviceid = $stateParams.serviceid;
    var servicename = $stateParams.servicename;
    console.log(serviceid);
    $scope.ServiceName = servicename;
    $scope.ServicePlanList = SERVICE.getServicePlanList(serviceid);
  })

//价格计划
  .controller('rateplan', function ($rootScope, $scope, $stateParams, RATE_PLAN, SERVICE,$state) {
    console.log($rootScope.hideTabs);
    console.log($rootScope.cityID);
    //选中的rateplanid
    $scope.SelectItem =
    {
      rateplan_id: 0,
      last_rateplan_id: 0,
      rateplan_name: '',
      price: 0,
      quantity: 1,
      unit: '',
      allcost: 0,
      type: 1,
      showname: true,
      showquantity: true
    };
    // 是否显示选中标签卡
    $scope.ISShowSelected = true;
    //是否显示向左滑动的按钮
    $scope.canSwipe = false;
    var serviceid = $stateParams.serviceid;
    var serviceplanid = $stateParams.serviceplan_id;
    var servicename = $stateParams.servicename;
    console.log(serviceplanid + ' ' + servicename);
    $scope.ServiceName = servicename;
    $scope.serviceplan = SERVICE.getServicePlan(serviceid, serviceplanid);
    console.log($scope.serviceplan);
    $scope.RatePlan = new Array();
    $scope.confirmItem = function (item) {
      console.log('radioclick');
      console.log(item);
      console.log($scope.SelectItem.rateplan_id);
      console.log(item.rateplan_id);
      if ($scope.SelectItem.last_rateplan_id != item.rateplan_id) {
        $scope.SelectItem.last_rateplan_id = item.rateplan_id;
        $scope.SelectItem.price = item.price;
        $scope.SelectItem.quantity = 1;
        $scope.SelectItem.rateplan_name = item.rateplan_name;
        $scope.SelectItem.unit = item.unit;
        $scope.SelectItem.type = item.type;
        if (item.type == '2') {
          $scope.SelectItem.showquantity = false;
        }
        else {
          $scope.SelectItem.showquantity = true;
        }
        //计算价格
        //computeCost();
      }
    };
    //计算价格
    var computeCost = function () {
      //数量计价
      if ($scope.SelectItem.type == 1) {
        $scope.SelectItem.allcost = $scope.SelectItem.price * $scope.SelectItem.quantity;
      }
      //一口价
      else if ($scope.SelectItem.type == 2) {
        $scope.SelectItem.allcost = $scope.SelectItem.price;
      }
      return $scope.SelectItem.allcost;
    };
    $scope.$watch(computeCost,function(newval,oldval){
      console.log('allcost');
      console.log(newval);
    });
    var getRateplan = RATE_PLAN.getRatePlanList(serviceplanid, $rootScope.cityID);
    if (getRateplan != null && getRateplan.SERVICE_ITEMS != null) {
      console.log('rateplans');
      console.log(getRateplan);
      var cost = '';
      var name = '';
      var rateplan_id = '';
      //for(i=0;i<getRateplan.SERVICE_ITEMS.length;i++)
      if (getRateplan.SERVICE_ITEMS.length == 1) {
        $scope.canSwipe = false;
        var one = getRateplan.SERVICE_ITEMS[0];
        if (one.COST_TYPE == '1') {
          cost = one.UNIT_COST + '/每' + one.UNIT_NAME;
          $scope.RatePlan.push({
            type: 1,
            rateplan_id: one.RATE_PLAN_ID,
            rateplan_name: '',
            cost: cost,
            unit: one.UNIT_NAME,
            price: one.UNIT_COST
          });
        } else if (one.COST_TYPE == '2') {
          cost = '一口价:' + one.ONE_COST;
          $scope.RatePlan.push({
            type: 2,
            rateplan_id: one.RATE_PLAN_ID,
            rateplan_name: '',
            cost: cost,
            unit: one.UNIT_NAME,
            price: one.ONE_COST
          });
          $scope.SelectItem.showquantity = false;
        }
        $scope.SelectItem.rateplan_id = $scope.RatePlan[0].rateplan_id;
        $scope.SelectItem.quantity = 1;
        $scope.SelectItem.rateplan_name = '';
        $scope.SelectItem.showname = true;
        $scope.SelectItem.price = $scope.RatePlan[0].price;
        $scope.SelectItem.unit=$scope.RatePlan[0].unit;
      }
      else {
        $scope.canSwipe = true;
        for (i = 0; i < getRateplan.SERVICE_ITEMS.length; i++) {
          if (getRateplan.SERVICE_ITEMS[i].COST_TYPE == '1') {
            cost = getRateplan.SERVICE_ITEMS[i].UNIT_COST + '/每' + getRateplan.SERVICE_ITEMS[i].UNIT_NAME;
            $scope.RatePlan.push({
              type: 1,
              rateplan_id: getRateplan.SERVICE_ITEMS[i].RATE_PLAN_ID,
              rateplan_name: getRateplan.SERVICE_ITEMS[i].PROPERTY_NAME,
              cost: cost,
              unit: getRateplan.SERVICE_ITEMS[i].UNIT_NAME,
              price: getRateplan.SERVICE_ITEMS[i].UNIT_COST
            });
            $scope.SelectItem.showquantity = true;
          }
          else if (getRateplan.SERVICE_ITEMS[i].COST_TYPE == '2') {
            cost = '一口价:' + getRateplan.SERVICE_ITEMS[i].ONE_COST;
            $scope.RatePlan.push({
              type: 2,
              rateplan_id: getRateplan.SERVICE_ITEMS[i].RATE_PLAN_ID,
              rateplan_name: getRateplan.SERVICE_ITEMS[i].PROPERTY_NAME,
              cost: cost,
              unit: getRateplan.SERVICE_ITEMS[i].UNIT_NAME,
              price: getRateplan.SERVICE_ITEMS[i].ONE_COST
            });
            $scope.SelectItem.showquantity = false;
          }
        }

        $scope.SelectItem.rateplan_id = $scope.RatePlan[0].rateplan_id;
        $scope.SelectItem.quantity = 1;
        $scope.SelectItem.rateplan_name = $scope.RatePlan[0].rateplan_name;
        $scope.SelectItem.showname = true;
        $scope.SelectItem.unit = $scope.RatePlan[0].unit;
        $scope.SelectItem.price = $scope.RatePlan[0].type=='1'?$scope.RatePlan[0].price:$scope.RatePlan[0].ONE_COST;
        $scope.SelectItem.type = $scope.RatePlan[0].type == '1' ? 1 : 2;
        if ($scope.RatePlan[0].type == '1') {
          $scope.SelectItem.showquantity = true;
        }
        else {
          $scope.SelectItem.showquantity = false;
        }
      }
    }
    console.log($scope.rateplan);

    $scope.confirmorder_01=function()
    {
      $state.go('tab.confirmorder_01',{serviceid:1,serviceplan_id:1,servicename:1,rateplanid:1});
    }
  })
.controller('confirmorder_01',function($scope,$stateParams)
  {

  })
