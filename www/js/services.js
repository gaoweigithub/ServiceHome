/**
 * Created by gaowe on 2015/10/7.
 */
angular.module('homeservice.services', [])

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
  .factory('SERVICE', function () {
    var services =
      [
        {
          SERVICE_ID: '1',
          PARENT_SERVICE_ID: '',
          SERVICE_CODE: 'JZ',
          SERVICE_NAME: '家政',
          SERVICE_ITEMS: '日常保洁，擦玻璃，深度保洁',
          PICURL: 'http://static.cnblogs.com/images/logo_small.gif',
          SERVICE_PLAN: [
            {
              SERVICE_PLAN_ID: 'sp1',
              SERVICE_ID: '1',
              SERVICE_PLAN_NAME: '日常保洁',
              SERVICE_PLAN_DESC: '日常保洁不包含室外玻璃和家电深度清洁',
              SERVICE_PLAN_URL: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
              SERVICE_LIMIT: '地面，厨房，卫生间；家具等等',
              SERVICE_STANDARD: '地面干净，离开时带走垃圾，室内整体光亮无尘'
            },
            {
              SERVICE_PLAN_ID: 'sp2',
              SERVICE_ID: '1',
              SERVICE_PLAN_NAME: '擦玻璃',
              SERVICE_PLAN_DESC: '明亮窗外色彩',
              SERVICE_PLAN_URL: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
              SERVICE_LIMIT: '地面，厨房，卫生间；家具等等',
              SERVICE_STANDARD: '地面干净，离开时带走垃圾，室内整体光亮无尘'
            },
            {
              SERVICE_PLAN_ID: 'sp3',
              SERVICE_ID: '1',
              SERVICE_PLAN_NAME: '深度保洁',
              SERVICE_PLAN_DESC: '出尽细微尘菌',
              SERVICE_PLAN_URL: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
              SERVICE_LIMIT: '地面，厨房，卫生间；家具等等',
              SERVICE_STANDARD: '地面干净，离开时带走垃圾，室内整体光亮无尘'
            }
          ]
        },
        {
          SERVICE_ID: '2',
          PARENT_SERVICE_ID: '',
          SERVICE_CODE: 'LR',
          SERVICE_NAME: '丽人',
          SERVICE_ITEMS: '手部美甲，足部美甲，美婕，美妆',
          PICURL: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png',
        }
      ];

    var getAllBasicServiceList = function () {
      return services;
    };
    var getServicePlanList = function (basicServiceID) {
      for (i = 0; i < services.length; i++) {
        if (services[i].SERVICE_ID == basicServiceID) {
          return services[i].SERVICE_PLAN;
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
        if (servicePlanList[i].SERVICE_PLAN_ID == servicePlanID) {
          return servicePlanList[i];
        }
      }
      return null;
    };
    return {
      getAllBasicServiceList: getAllBasicServiceList,
      getServicePlanList: getServicePlanList,
      getServicePlan: getServicePlan
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

  .factory('CITIES', function () {
    var open_cities = [
      {cityid: '1', cityname: '北京'},
      {cityid: '2', cityname: '上海'},
      {cityid: '3', cityname: '常州'},
      {cityid: '4', cityname: '无锡'},
      {cityid: '5', cityname: '苏州'},
      {cityid: '6', cityname: '镇江'},
      {cityid: '7', cityname: '江阴'},
      {cityid: '8', cityname: '沭阳'},
      {cityid: '9', cityname: '宿迁'},
    ];
    var locate_city = {};

    //获取已开通城市列表
    var getOpenCityList = function () {
      return open_cities;
    };
    var getSelectedCity = function (cityID) {
      if (open_cities == null)return null;
      for (i = 0; i < open_cities.length; i++) {
        if (open_cities[i].cityid == cityID) {
          return open_cities[i];
        }
      }
      return null;
    };
    //获取定位城市
    var getLocateCity = function () {
      for (var name in  locate_city) {
        return locate_city;
      }
      return {cityid: -1, cityname: "定位失败，点击重试.."}
    };
    //重新定位
    var reLocat = function () {
      locate_city = {
        cityid: '2', cityname: '上海'
      };
      return locate_city;
    }
    return {
      getOpenCityList: getOpenCityList,
      getSelectedCity: getSelectedCity,
      getLocateCity: getLocateCity,
      reLocat: reLocat
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
        PRICE: 345
      }
    ];
    var getOrders = function (status) {
      return Orders;
    }
    var cancelOrder = function (orderid) {
      //todo
    }
    return {
      getOrders: getOrders,
      cancelOrder: cancelOrder
    }
  })
  //服务地址
  .factory('SERVICE_PLACE', function () {
    var servicePlaceList = [
      {
        SERVICE_PLACE_ID: 1,
        SERVICE_PLACE_NAME: '诸新一村103号',
        SERVICE_PLACE_ADDRESS: '上海市平乐路103号',
        SERVICE_PLACE_ADDRESS_USERINPUT:'',
        PHONE:18612112092,
        LNG: 121,
        LAT: 31
      },
      {
        SERVICE_PLACE_ID: 2,
        SERVICE_PLACE_NAME: '凌空SOHO',
        SERVICE_PLACE_ADDRESS: '上海市闵行区金钟路广顺路',
        SERVICE_PLACE_ADDRESS_USERINPUT:'',
        PHONE:18612112092,
        LNG: 121,
        LAT: 31
      }
    ];

    var getServicePlaceList=function()
    {
      return servicePlaceList;
    }
    var deleteServicePlace= function (id) {
      if(servicePlaceList!=null)
      {
        for(i=0;i<servicePlaceList.length;i++)
        {
          if(servicePlaceList[i].SERVICE_PLACE_ID==id)
          {
            servicePlaceList.splice(i,1);
          }
        }
      }
    }
    //获取默认地址，即上一次的服务地址
    var getLastUseServicePlace=function()
    {
      if(servicePlaceList!=null&&servicePlaceList.length>0)
      {
        return servicePlaceList[0];
      }
      else
      {
        return null;
      }
    }
    var addNewPlace=function(newplace)
    {
      servicePlaceList.push(newplace);
    }
    return {
      getServicePlaces:getServicePlaceList,
      deleteServicePlace:deleteServicePlace,
      getLastUseServicePlace:getLastUseServicePlace,
      addNewPlace:addNewPlace
    }
  })
  //windowlocalstorage
  .factory('ls',['$window',function($window){
    return {
      set: function(key, value) {
        $window.localStorage[key] = value;
      },
      get: function(key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function(key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage[key] || '{}');
      }
    }
  }])


























