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

    $ionicModal.fromTemplateUrl("datemodal.html", function (modal) {
        $scope.datemodal = modal;
      },
      {
        animation: 'slide-in-up',
        focusFirstInput: true
      });
    //$scope.deadline = function() {
    //  var options = {
    //    date: $scope.todo_date,
    //    mode: 'date'
    //  };
    //  datePicker.show(options, function(d) {
    //    if (!isNaN(d.getTime())) {  // valid date
    //      $scope.$apply(function () {
    //        $scope.todo_date = d;
    //      });
    //    }
    //  });
    //}

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
  .controller('datemodal',function($scope)
  {
    $scope.deadline = function() {
      var options = {
        date: $scope.todo_date,
        mode: 'date'
      };
      datePicker.show(options, function(d) {
        if (!isNaN(d.getTime())) {  // valid date
          $scope.$apply(function () {
            $scope.todo_date = d;
          });
        }
      });
    }
  })
//订单
  .controller('orders', function ($scope, ORDERS) {
    console.log('orders');
    $scope.Orders = ORDERS.getOrders(1);
  })

  //用户登录
  .controller('userlogin', function ($scope, $rootScope, $state, $location, ls) {
    console.log('userlogin');
    //发送验证码
    $scope.sendConfirmNo = function () {
      console.log('sendmatchno');
    }
    //确认登录
    $scope.ConfirmLogin = function () {
      console.log('confirmlogin');
      console.log(window.localStorage);
      ls.setObject('userData', {
        phone: 18612112092,
        matchno: 12345
      });
      var userdata = ls.getObject('userData', null);
      console.log(userdata);
      $rootScope.UserData = userdata;
      $state.go('tab.usercenter', {}, {reload: true});
    }

  }
)
//个人中心
  .controller('usercenter', function ($scope, $rootScope, $ionicPopup, $state, ls) {
    if (!ls.getObject('userData', null)) {
      console.log('false');
      $scope.isLogin = false;
    }
    else {
      console.log('true');
      $scope.isLogin = true;
      $rootScope.UserData = ls.getObject('userData', null)
    }
    //编辑
    $scope.editplaces = function () {
      console.log('edit');
      if (ls.getObject('userData', null) == null) {
        $state.go('tab.userlogin');
      }
      else {
        $state.go('tab.serviceplacelist', {});
      }
    };
    //关于
    $scope.aboutUs = function () {
      var alertPopup = $ionicPopup.alert({
        title: '关于',
        template: '服务到家 V0.1'
      });
      alertPopup.then(function (res) {
        console.log('close about');
      });
    };
    //反馈
    $scope.feedback = function () {
      $scope.data = {}
      var myPopup = $ionicPopup.show({
        template: '<textarea rows="5" ng-model="data.feedback" focusMe="true">',
        title: '意见反馈',
        subTitle: '非常感谢您的支持',
        scope: $scope,
        buttons: [
          {text: '取消'},
          {
            text: '<b>提交</b>',
            type: 'button-positive',
            onTap: function (e) {
              if (!$scope.data.feedback) {
                e.preventDefault();
              } else {
                return $scope.data.feedback;
              }
            }
          }
        ]
      });
      myPopup.then(function (res) {
        console.log(res);
      });
    };
    $scope.login = function () {
      $state.go('tab.userlogin');
    };
    $scope.logout = function () {
      ls.setObject('userData', null);
      $rootScope.UserData = ls.getObject('userData', null);
      $scope.isLogin = false;
    };
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
  .controller('confirmorder_01', function ($scope, $rootScope, $stateParams, SERVICE_PLACE) {
    console.log('111');
    $rootScope.selectedPlace = SERVICE_PLACE.getLastUseServicePlace();
    $scope.extraneeds = [
      {value: false, desc: '重点打扫厨房', id: 1},
      {value: false, desc: '阿姨不要话多', id: 2},
      {value: false, desc: '上门前打个电话', id: 3},
      {value: false, desc: '家有爱宠', id: 4}
    ];
  })
  .controller('selectservicetime', function ($scope) {
    $scope.times = [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];
  })
  //百度地图定位
  .controller('locatesite', function ($scope, $ionicHistory, $rootScope, ls) {
    $scope.val = "";
    $scope.datas = Array();
    $scope.lastAddress = {lng: 116.331398, lat: 39.897445};
    var map = new BMap.Map('allmap');
    var lastPlace = ls.getObject('lastPoint', null);
    if (lastPlace != null && lastPlace != undefined&&lastPlace.lng!=undefined) {
      console.log('find');
      console.log(lastPlace);
      var point = new BMap.Point(lastPlace.lng, lastPlace.lat);
      map.centerAndZoom(point, 12);
    }
    else {
      console.log('not find');
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.centerAndZoom(r.point, 12);
          ls.setObject('lastPoint', r.point);
          console.log(r.point);
        }
        else {
        }
      }, {enableHighAccuracy: true});
    }


    var options = {
      onSearchComplete: function (results) {
        // 判断状态是否正确
        if (local.getStatus() == BMAP_STATUS_SUCCESS) {
          var s = [];
          for (var i = 0; i < results.getCurrentNumPois() && i <= 6; i++) {
            s.push({
              title: results.getPoi(i).title,
              address: results.getPoi(i).address,
              point: results.getPoi(i).point
            });
          }
          if (s.length >= 1) {
            console.log(s[0].point);
            map.clearOverlays();    //清除地图上所有覆盖物
            map.centerAndZoom(s[0].point, 18);
            map.addOverlay(new BMap.Marker(s[0].point));
          }
          $scope.datas = s;
          $scope.$apply();
        }
      }
    };
    var local = new BMap.LocalSearch(map, options);
    $scope.textChange = function (val) {
      console.log('hh');
      local.search(val);
    };
    $scope.confirmsite = function (d) {
      //$rootScope.newPlace = {placename: placename, address: address, lng: lng, lat: lat};
      $rootScope.addNewPlace.SERVICE_PLACE_NAME= d.title;
      $rootScope.addNewPlace.SERVICE_PLACE_ADDRESS= d.address;
      $rootScope.addNewPlace.LAT= d.lat;
      $rootScope.addNewPlace.LNG= d.lng;
      console.log(d);
      $ionicHistory.goBack();
    }
  })

  .controller('serviceplacelist', function ($scope, $state, $ionicPopup, SERVICE_PLACE) {
    $scope.showAddButton = false;
    $scope.ifShowDeleteButton = true;
    $scope.showDeleteButton = function () {
      console.log('dlete');
      $scope.showDelete = !$scope.showDelete;
    };
    $scope.showDelete = false;
    $scope.ServicePlaces = SERVICE_PLACE.getServicePlaces();
    $scope.deleteplace = function (item) {
      //$scope.ServicePlaces.remove(item);
      if ($scope.ServicePlaces != null) {
        for (i = 0; i < $scope.ServicePlaces.length; i++) {
          if ($scope.ServicePlaces[i].SERVICE_PLAN_ID == item.SERVICE_PLACE_ID) {
            $scope.ServicePlaces.splice(i, 1);
          }
        }
      }
      SERVICE_PLACE.deleteServicePlace(item.SERVICE_PLACE_ID);
    };
  })
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
  .controller('addnewplace', function ($scope, $rootScope, $state,$ionicHistory,SERVICE_PLACE) {
    $rootScope.addNewPlace =
    {
      SERVICE_PLACE_ID: null,
      SERVICE_PLACE_NAME: '请选择地址',
      SERVICE_PLACE_ADDRESS: null,
      SERVICE_PLACE_ADDRESS_USERINPUT:null,
      PHONE: null,
      LNG: null,
      LAT: null
    };
    var getBaiduLocate = function () {
      $state.go('tab.locatesite', {});
    }
    //确定
    $scope.ConfirmAdd=function()
    {
      console.log('asdasda');
      SERVICE_PLACE.addNewPlace($rootScope.addNewPlace);
      $ionicHistory.goBack();

    }
  })







