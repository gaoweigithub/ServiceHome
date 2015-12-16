/**
 * Created by gaowe on 2015/11/17.
 */
angular.module('homeservice.homepage', [])
  //下单用
  .controller('serviceplacelist_select', function ($scope, $rootScope, $state, $ionicHistory, SERVICE_PLACE) {
    $scope.ifShowDeleteButton = false;
    $scope.showAddButton = true;
    $scope.showDeleteButton = function () {
      //donothing
    };
    $scope.showDelete = false;
    $scope.ServicePlaces = SERVICE_PLACE.getServicePlaces();
    $scope.deleteplace = function (item) {
      //nothing
    };
    $scope.selectplace = function (item) {
      console.log('selectplace');
      $rootScope.selectedPlace = item;
      $ionicHistory.goBack()
    }
    $scope.addplace = function () {
      $state.go('tab.addnewplace', {});
    }
  })
  //主页
  .controller('homepage', function (ENV, $rootScope, $scope, $resource, $ionicSlideBoxDelegate, $ionicModal, Advertisement, SERVICE, RATE_PLAN, CITIES, ls) {

    $rootScope.UserData = {
      phone: '1',
      matchno: '2'
    }
    //缓存获取上次城市
    var lastCity = ls.getObject('lastCity');
    console.log('ccccc');
    console.log(lastCity);
    if (lastCity != null && lastCity.cityID != undefined) {
      console.log('iiiii');
      $rootScope.cityInfo = {cityID: lastCity.cityID, cityName: lastCity.cityName};
    }
    else {
      lastCity = CITIES.getLocateCity();
      console.log('ddddd');
      console.log(lastCity);
      $rootScope.cityInfo = lastCity;
      ls.setObject('lastCity', lastCity);
    }

    console.log($rootScope.cityID);
    console.log('homepage');
    $scope.advs = Advertisement.getAllAdvs();

    //$scope.BasicServices =
    SERVICE.getAllBasicServiceList().$promise.then(function (response) {
      $scope.BasicServices=response;
    }, function () {
      console.log("loadservice err");
    });
    console.log('services:' + $scope.BasicServices);

    $ionicModal.fromTemplateUrl("modal.html", function (modal) {
        $scope.modal = modal;
      },
      {
        animation: 'slide-in-up',
        focusFirstInput: true
      });

    $ionicModal.fromTemplateUrl("datetimepiker.html", function (modal) {
        $scope.datetimemodal = modal;
      },
      {
        animation: 'slide-in-up',
        focusFirstInput: true
      });

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
  .controller('rateplan', function ($rootScope, $scope, $stateParams, RATE_PLAN, SERVICE, $state) {
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
    $scope.$watch(computeCost, function (newval, oldval) {
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
        $scope.SelectItem.unit = $scope.RatePlan[0].unit;
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
        $scope.SelectItem.price = $scope.RatePlan[0].type == '1' ? $scope.RatePlan[0].price : $scope.RatePlan[0].ONE_COST;
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

    $scope.confirmorder_01 = function () {
      $state.go('tab.confirmorder_01', {serviceid: 1, serviceplan_id: 1, servicename: 1, rateplanid: 1});
    }
  })
  //订单确认界面
  .controller('confirmorder_01', function ($scope, $rootScope, $stateParams, $ionicModal, SERVICE_PLACE) {
    $ionicModal.fromTemplateUrl("datetimepiker.html", function (modal) {
        $scope.datetimemodal = modal;
      },
      {
        animation: 'slide-in-up',
        focusFirstInput: true
      });
    console.log('111');
    $rootScope.selectedPlace = SERVICE_PLACE.getLastUseServicePlace();
    $scope.extraneeds = [
      {value: false, desc: '重点打扫厨房', id: 1},
      {value: false, desc: '阿姨不要话多', id: 2},
      {value: false, desc: '上门前打个电话', id: 3},
      {value: false, desc: '家有爱宠', id: 4}
    ];
    $rootScope.selectDatetime = {isSelect: false};
    $rootScope.serviceduration = {isSelect: false};
  })
  //服务时长列表
  .controller('selectservicetime', function ($scope, $rootScope, $ionicHistory) {
    $scope.times = [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];
    $scope.confirmtime = function (t) {
      $rootScope.serviceduration = {
        isSelect: true,
        duration: t
      };
      $ionicHistory.goBack();
    }
  })
;
