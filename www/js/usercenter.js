/**
 * Created by gaowe on 2015/11/17.
 */
angular.module('homeservice.usercenter',[])
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

  })
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
