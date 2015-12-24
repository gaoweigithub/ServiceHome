/**
 * Created by gaowe on 2015/11/17.
 */
angular.module('homeservice.usercenter', [])
  //用户登录
  .controller('userlogin', function ($scope, $rootScope, $ionicPopup, $state, $location, ls, $resource, $interval, commontool, $timeout) {

    $scope.phonecheck = {userPhoneNO: '', userID: '', userCheckCode: ''};
    $scope.buttonText = {sendCheckcode: '发送验证码', sendLoginConfirm: '确定', secondCounter: 0, ifsend: false};
    console.log('userlogin');
    var sfn = function (response) {
      console.log(JSON.stringify(response));
      $scope.ifsend = true;
      var alertPopup = $ionicPopup.alert({
        template: response.ResponseStatus.ErrorList[0],
        okText: '确定'
      });
      alertPopup.then(function (res) {
        console.log('发送验证码成功');
      });
    };
    var efn = function (response) {
      var alertPopup = $ionicPopup.alert({

        template: '发送验证码失败',
        okText: '确定'
      });
      alertPopup.then(function (res) {
        console.log('发送验证码失败');
      });
    };
    //发送验证码
    $scope.sendConfirmNo = function () {
      if ($scope.phonecheck.userPhoneNO == '' || $scope.phonecheck.userCheckCode == null) {
        $ionicPopup.alert({
          template: '手机号不能为空',
          okText: '确定'
        });
      }
      else if ($scope.buttonText.secondCounter != 0) {
        $ionicPopup.alert({
          template: $scope.buttonText.secondCounter + '秒后再试!',
          okText: '确定'
        });
      }
      else {
        console.log('sendmatchno');
        var resource = $resource("http://localhost:34413/SendSMSCheckCode");
        console.log($scope.phonecheck.userPhoneNO);
        resource.get({PhoneNO: $scope.phonecheck.userPhoneNO}, function (response) {
          console.log(response.ResponseStatus.isSuccess);
          if (response.ResponseStatus.isSuccess) {
            $scope.buttonText.ifsend = true;
            $scope.buttonText.secondCounter = 60;
            $interval(function () {
              $scope.buttonText.sendCheckcode = $scope.buttonText.secondCounter + '秒后再试!';
              $scope.buttonText.secondCounter = $scope.buttonText.secondCounter - 1;
            }, 1000, 60).then(function () {
              $scope.buttonText.sendCheckcode = '发送验证码'
            });
            sfn(response);
          }
          else {
            efn(response);
          }
        }, efn);
      }
    }

    //确认登录
    $scope.ConfirmLogin = function () {
      //check
      if ($scope.phonecheck.userCheckCode != '' && $scope.phonecheck.userCheckCode.length != 6) {
        $ionicPopup.alert({
          template: '验证码不正确',
          okText: '重新填写'
        });
      }
      else {
        console.log(commontool.createUri('CheckAndLogin'));
        //resource
        var loginresource = $resource(commontool.createUri('CheckAndLogin'));
        loginresource.get({PhoneNO: $scope.phonecheck.userPhoneNO, CheckCode: $scope.phonecheck.userCheckCode},
          function (suc) {
            if (suc.ResponseStatus.isSuccess) {
              //缓存返回的userid和验证码
              $rootScope.phonecheck = {
                userPhoneNO: $scope.phonecheck.userPhoneNO,
                userID: suc.USERID,
                userCheckCode: $scope.phonecheck.userCheckCode,
                isLogin: true
              };

              console.log('登陆成功！！' + JSON.stringify(suc) + JSON.stringify($rootScope.phonecheck));

              ls.set('userinfo', JSON.stringify($rootScope.phonecheck));

              $timeout(function () {
                  $ionicPopup.alert({
                    template: '登陆成功',
                    okText: '确认'
                  }).then(function () {
                    //设置登录状态并且跳转页面
                    $state.go('tab.usercenter', {}, {reload: true});
                  });

                },
                0);


            }
            else {
              $ionicPopup.alert({
                template: '登录失败',
                okText: '重试'
              });
            }
          },
          function (err) {
            $ionicPopup.alert({
              template: '登录失败',
              okText: '重试'
            });
          }
        );


      }


      //console.log('confirmlogin');
      //ls.setObject('userData', {
      //  phone: 18612112092,
      //  matchno: 12345
      //});
      //var userdata = ls.getObject('userData', null);
      //console.log(userdata);
      //$rootScope.UserData = userdata;
      //$state.go('tab.usercenter', {}, {reload: true});
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
