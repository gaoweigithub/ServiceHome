/**
 * Created by gaowe on 2015/10/7.
 */
angular.module('homeservice.services', [])
  .factory('Storage', function () {
    "use strict";
    return {
      set: function (key, data) {
        return window.localStorage.setItem(key, window.JSON.stringify(data));
      },
      get: function (key) {

        return window.JSON.parse(window.localStorage.getItem(key));
      },
      remove: function (key) {
        return window.localStorage.removeItem(key);
      }
    };
  })
  .factory('Push', function (ENV) {
    var push;
    return {
      setBadge: function (badge) {
        if (push) {

          plugins.jPushPlugin.setBadge(badge);
        }
      },
      resetBadge: function () {
        if (push) {
          plugins.jPushPlugin.resetBadge();
        }
      },
      setAlias: function (alias) {
        if (push) {
          plugins.jPushPlugin.setAlias(alias);

        }
      },
      check: function () {

        if (window.jpush && push) {

          window.jpush = null;
        }
      },
      init: function (notificationCallback) {


        push = window.plugins && window.plugins.jPushPlugin;
        if (push) {


          plugins.jPushPlugin.init();
          plugins.jPushPlugin.setDebugMode(false);
          try {
            if (plugins.jPushPlugin.isPlatformIOS()) {
              plugins.jPushPlugin.setLogOFF();
            }
            plugins.jPushPlugin.openNotificationInAndroidCallback = notificationCallback;

            plugins.jPushPlugin.receiveNotificationIniOSCallback = notificationCallback;
          } catch (exception) {
            console.debug('exception--------------------');
            console.debug("JPushPlugin initexception ： " + exception);
          }
        }
      },
      stopPush: function () {
        // 停止推送
        plugins.jPushPlugin.stopPush();


      },
      resumePush: function () {
        // 唤醒推送

        plugins.jPushPlugin.resumePush();

      }
    };
  })
  //windowlocalstorage
  .factory('ls', ['$window', function ($window) {
    return {
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }
  }])
  //首页图片广告
  .factory('Advertisement', function () {
    var advs = [
      {id: 1, title: '1', url: 'http://www.xxjxsj.cn/article/UploadPic/2009-10/2009101018545196251.jpg'},
      {id: 2, title: '2', url: 'http://www.xxjxsj.cn/article/UploadPic/2009-10/2009101018545196251.jpg'},
      {id: 3, title: '3', url: 'http://www.xxjxsj.cn/article/UploadPic/2009-10/2009101018545196251.jpg'}
    ];
    var getAllAdvs = function () {
      return advs;
    };
    return {
      getAllAdvs: getAllAdvs
    };
  })

  //订单字典表
  .factory('SERVICE', function ($resource, $rootScope) {

    var servicelistcache = {};

    var setServiceListCache = function (sl) {
      servicelistcache = sl;
    }

    var getServiceListCache = function () {
      return servicelistcache;
    }
    var getAllService = function (url, cityid) {
      var servicesResource = $resource(url);
      return servicesResource.get({cityid: cityid});
    };
    var getServicePlanList = function (basicServiceID) {
      for (i = 0; i < servicelistcache.length; i++) {
        if (servicelistcache[i].SERVICE_ID == basicServiceID) {
          return servicelistcache[i].SERVICE_ITEMS;
        }
      }
      return null;
    };
    //获取价格计划
    var getServicePlan = function (serviceid, servicePlanID) {
      console.log('serviceid:' + serviceid);
      console.log('servicePlanID:' + servicePlanID);
      var servicePlanList = getServicePlanList(serviceid);
      for (i = 0; i < servicePlanList.length; i++) {
        if (servicePlanList[i].SERVICE__ID == servicePlanID) {
          return servicePlanList[i];
        }
      }
      return null;
    };
    return {
      getAllBasicServiceList: getAllService,
      getServicePlanList: getServicePlanList,
      getServicePlan: getServicePlan,
      setServiceListCache: setServiceListCache,
      getServiceListCache: getServiceListCache
    };
  })

  //价格计划
  .factory('RATE_PLAN', function () {
    var rate_plans =
      [
        {
          //业务计划id
          SERVICE_PLAN_ID: 'sp1',
          //城市id
          CITYID: '1',
          //服务项
          SERVICE_ITEMS: [
            {
              RATE_PLAN_ID: '10',
              UNIT_COST: '12',
              UNIT_NAME: '平米',
              ONE_COST: '',
              COST_TYPE: '1'
            }
          ],
        },
        {
          //业务计划id
          SERVICE_PLAN_ID: 'sp2',
          //城市id
          CITYID: '1',
          //服务项
          SERVICE_ITEMS: [
            {
              RATE_PLAN_ID: '11',
              UNIT_COST: '30',
              UNIT_NAME: '小时',
              ONE_COST: '',
              COST_TYPE: '1'
            }
          ],
        },
        {
          //业务计划id
          SERVICE_PLAN_ID: 'sp3',
          //城市id
          CITYID: '1',
          //服务项
          SERVICE_ITEMS: [
            {
              RATE_PLAN_ID: '1',
              PROPERTY_ID: 'pp1',
              PROPERTY_NAME: '一居室',
              UNIT_COST: '400',
              UNIT_NAME: '个',
              ONE_COST: '',
              COST_TYPE: '1'
            },
            {
              RATE_PLAN_ID: '5',
              PROPERTY_ID: 'pp5',
              PROPERTY_NAME: '三居室(2卫)',
              UNIT_COST: '830',
              UNIT_NAME: '个',
              ONE_COST: '',
              COST_TYPE: '1'
            },
            {
              RATE_PLAN_ID: '6',
              PROPERTY_ID: 'pp6',
              PROPERTY_NAME: '四居室(3卫)',
              UNIT_COST: '950',
              UNIT_NAME: '个',
              ONE_COST: '',
              COST_TYPE: '1'
            },
            {
              RATE_PLAN_ID: '7',
              PROPERTY_ID: 'pp7',
              PROPERTY_NAME: '四居室以上',
              UNIT_COST: '6',
              UNIT_NAME: '平米',
              ONE_COST: '',
              COST_TYPE: '1'
            },
            {
              RATE_PLAN_ID: '8',
              PROPERTY_ID: 'pp8',
              PROPERTY_NAME: '单独卫生间',
              UNIT_COST: '130',
              UNIT_NAME: '个',
              ONE_COST: '',
              COST_TYPE: '1'
            },
            {
              RATE_PLAN_ID: '9',
              PROPERTY_ID: 'pp9',
              PROPERTY_NAME: '单独厨房',
              UNIT_COST: '210',
              UNIT_NAME: '个',
              ONE_COST: '222',
              COST_TYPE: '2'
            },
          ],
        }
      ];

    var getRatePlanList = function (servicePlanID, cityID) {
      for (i = 0; i < rate_plans.length; i++) {
        if (rate_plans[i].SERVICE_PLAN_ID == servicePlanID && rate_plans[i].CITYID == cityID) {
          return rate_plans[i];
        }
      }
      return null;
    };
    return {
      getRatePlanList: getRatePlanList
    };
  })

  .factory('CITIES', function ($resource, ENV, Storage) {
    var citykey = 'selectedcity';
    var open_cities = null;
    var locate_city = null;
    var cityresource = $resource(ENV.server + 'GetOpenedCity');
    cityresource.get(function (suc) {
      console.log(suc);
      if (suc != null && suc.DATA != undefined && suc.ResponseStatus.isSuccess == true) {
        console.log('获取城市列表成功');
        console.log(suc.DATA)
        open_cities = suc.DATA;
      }
    }, function (err) {
      console.log('获取城市列表出错');
    });
    //获取已开通城市列表
    var getOpenCityList = function () {
      return open_cities;
    };
    //获取定位城市
    var getLocateCity = function () {
      for (var name in  locate_city) {
        return locate_city;
      }
      return {CITYID: -1, CITYNAME: "定位失败，点击重试.."}
    };
    //重新定位
    var reLocat = function () {
      locate_city = {
        CITYID: '1', CITYNAME: '常州'
      };
      this.setCurrentCity(locate_city);
      return locate_city;
    };
    var setCityList = function (data) {
      open_cities = data;
    }
    return {
      getOpenCityList: getOpenCityList,
      getSelectedCity: function () {
        return Storage.get(citykey);
      },
      getLocateCity: getLocateCity,
      reLocat: reLocat,
      setCurrentCity: function (data) {
        Storage.set(citykey, data);
      }
    }
  })
  //订单列表
  .factory('ORDERS', function () {
    var Orders = [
      {
        ORDERID: 1,
        STATUS: 1,
        STATUS_NAME: '待支付',
        SERVICE_NAME: '家庭保洁',
        SERVICE_PLACE: '诸新一村103号',
        RATE_PLAN_ID: 10,
        ACTUAL_START_TIME: '2015-10-24 17:00',
        ACTUAL_END_TIME: '2015-10-24 19:00',
        EXPIRE_TIME: '2015-10-24 20:00',
        BUTTON_TEXT: '去支付',
        BUTTON_FUNCTION: 'payorder',
        EXTRANEEDS: '家有宠物',
        PRICE: 345,
        CONTACTPERSON: '高威',
        CONTACTPHONE: 18612112092
      }
    ];
    var getOrders = function () {
      return Orders;
    }
    var getOrderbyOrderID = function (orderid) {
      for (var i = 0; i < Orders.length; i++) {
        if (Orders[i].ORDERID == orderid) {
          return Orders[i];
        }
      }
    }
    var cancelOrder = function (orderid) {
      //todo
    }
    return {
      getOrders: getOrders,
      cancelOrder: cancelOrder,
      getOrderbyOrderID: getOrderbyOrderID
    }
  })
  //服务地址
  .factory('SERVICE_PLACE', function () {
    var servicePlaceList = [
      {
        SERVICE_PLACE_ID: 1,
        SERVICE_PLACE_NAME: '诸新一村103号',
        SERVICE_PLACE_ADDRESS: '上海市平乐路103号',
        SERVICE_PLACE_ADDRESS_USERINPUT: '',
        CONTACKPERSON: '高威',
        PHONE: 18612112092,
        LNG: 121,
        LAT: 31
      },
      {
        SERVICE_PLACE_ID: 2,
        SERVICE_PLACE_NAME: '凌空SOHO',
        SERVICE_PLACE_ADDRESS: '上海市闵行区金钟路广顺路',
        SERVICE_PLACE_ADDRESS_USERINPUT: '',
        CONTACKPERSON: '张倩',
        PHONE: 18612112092,
        LNG: 121,
        LAT: 31
      }
    ];

    var getServicePlaceList = function () {
      return servicePlaceList;
    }
    var deleteServicePlace = function (id) {
      if (servicePlaceList != null) {
        for (i = 0; i < servicePlaceList.length; i++) {
          if (servicePlaceList[i].SERVICE_PLACE_ID == id) {
            servicePlaceList.splice(i, 1);
          }
        }
      }
    }
    //获取默认地址，即上一次的服务地址
    var getLastUseServicePlace = function () {
      if (servicePlaceList != null && servicePlaceList.length > 0) {
        return servicePlaceList[0];
      }
      else {
        return null;
      }
    }
    var addNewPlace = function (newplace) {
      servicePlaceList.push(newplace);
    }
    return {
      getServicePlaces: getServicePlaceList,
      deleteServicePlace: deleteServicePlace,
      getLastUseServicePlace: getLastUseServicePlace,
      addNewPlace: addNewPlace
    }
  })

  .factory('pingpp', ['$q', '$window', function ($q, $window) {
    return {
      createPayment: function (charge) {
        return $q(function (resolve, reject) {
          $window.pingpp.createPayment(charge, function () {
            resolve();
          }, function (err) {
            reject(err);
          });
        });
      }
    };
  }])

  .factory('userData', ['Storage', function (Storage) {
    var userkey = 'userinfo';
    var user = Storage.get(userkey) || {};
    return {
      getCurrentUser: function () {
        return user;
      },
      setCurrentUser: function (user) {
        Storage.set(userkey, user);
      },
      LogOut: function () {
        user = {};
        Storage.remove(userkey);
      }
    }
  }])


























