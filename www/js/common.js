/**
 * Created by gaowe on 2015/11/17.
 */
angular.module('homeservice.common', [])
  //添加新的服务地址
  .controller('addnewplace', function ($scope, $rootScope, $state, $ionicHistory, SERVICE_PLACE) {
    $rootScope.addNewPlace =
    {
      SERVICE_PLACE_ID: null,
      SERVICE_PLACE_NAME: '请选择地址',
      SERVICE_PLACE_ADDRESS: null,
      SERVICE_PLACE_ADDRESS_USERINPUT: null,
      CONTACKPERSON: null,
      PHONE: null,
      LNG: null,
      LAT: null
    };
    var getBaiduLocate = function () {
      $state.go('tab.locatesite', {});
    }
    //确定
    $scope.ConfirmAdd = function () {
      console.log('asdasda');
      SERVICE_PLACE.addNewPlace($rootScope.addNewPlace);
      $ionicHistory.goBack();
    }
  })
  //百度地图定位
  .controller('locatesite', function ($scope, $ionicHistory, $rootScope, ls) {
    $scope.val = "";
    $scope.datas = Array();
    $scope.lastAddress = {lng: 116.331398, lat: 39.897445};
    var map = new BMap.Map('allmap');
    var lastPlace = ls.getObject('lastPoint', null);
    if (lastPlace != null && lastPlace != undefined && lastPlace.lng != undefined) {
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
      $rootScope.addNewPlace.SERVICE_PLACE_NAME = d.title;
      $rootScope.addNewPlace.SERVICE_PLACE_ADDRESS = d.address;
      $rootScope.addNewPlace.LAT = d.lat;
      $rootScope.addNewPlace.LNG = d.lng;
      console.log(d);
      $ionicHistory.goBack();
    }
  })
//服务地址列表
  .controller('serviceplacelist', function ($scope, $state, $ionicPopup, SERVICE_PLACE) {
    console.log('jinlaileaaaaa');
    $scope.showAddButton = false;
    $scope.ifShowDeleteButton = true;
    $scope.showDeleteButton = function () {
      console.log('dlete');
      $scope.showDelete = !$scope.showDelete;
    };
    $scope.showDelete = false;
    $scope.ServicePlaces = SERVICE_PLACE.getServicePlaces();
    console.log($scope.ServicePlaces);
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
  //城市选择弹出框
  .controller('ModalCtrl', function ($rootScope, $scope, $ionicModal, CITIES) {
    var locateCity = CITIES.getLocateCity();

    $scope.selectCityID = locateCity.cityId;
    $scope.selectCityName = locateCity.cityName;


    $scope.getOpenCityList = function () {
      return CITIES.getOpenCityList();
    };
    $scope.confirmLocate = function () {
      $rootScope.cityInfo = {cityID: $scope.selectCityID, cityName: $scope.selectCityName};
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
  //时间选择弹出框
  .controller('datemodal', function ($scope, $rootScope) {
    $scope.dates = [
      {text: '11月15号', value: '2015-11-15'},
      {text: '11月16号', value: '2015-11-16'},
      {text: '11月17号', value: '2015-11-17'},
      {text: '11月18号', value: '2015-11-18'},
      {text: '11月19号', value: '2015-11-19'},
      {text: '11月20号', value: '2015-11-20'}
    ];
    $scope.time_hours = [
      {text: '上午8点', value: 8},
      {text: '上午9点', value: 9},
      {text: '上午10点', value: 10},
      {text: '上午11点', value: 11},
      {text: '上午12点', value: 12},
      {text: '下午1点', value: 13},
      {text: '下午2点', value: 14},
      {text: '下午3点', value: 15},
      {text: '下午4点', value: 16},
      {text: '下午5点', value: 17}
    ];
    $scope.time_minutes = [
      {text: '0', value: 0},
      {text: '30', value: 30}
    ];
    $scope.selectDatetime = {
      date: null, time_hour: null, time_minute: null
    };
    $scope.selectDatetime.date = $scope.dates[0].value;
    $scope.selectDatetime.time_hour = $scope.time_hours[0].value;
    $scope.selectDatetime.time_minute = $scope.time_minutes[0].value;
    $scope.confirmdatetime = function () {
      $rootScope.selectDatetime = {
        isSelect: true,
        date: $scope.selectDatetime.date,
        time_hour: $scope.selectDatetime.time_hour,
        time_minute: $scope.selectDatetime.time_minute
      };
    }
  })
  .factory('commontool', function ($ionicPopup, ENV, $rootScope) {
    var createUri = function (interfaceName) {
      return ENV.server + interfaceName;
    };

    var createGetparam = function () {
      if ($rootScope.UserData != null && $rootScope.UserData.userid != '' && $rootScope.UserData.matchno != '') {
        return 'userid=' + $rootScope.UserData.userid + '&acode=' + $rootScope.UserData.matchno;
      }
      else {
        return '';
      }
    }


    return {
      createUri: createUri,
      createGetparam: createGetparam
    }
  });

