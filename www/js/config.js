/**
 * Created by gaowe on 2015/11/18.
 */
angular.module("homeservice.config", [])
  .constant("ENV", {
    // "name": "production",
    accessToken: '',
    debug: false,
    api: "",
    // "api": "http://localhost:3000/api/v1",
    appleId: '',
    version: '',
    server: 'http://localhost:34413/',
    userid: 1000,
    acode: '549937',
    parameters: 'format=json&userid=1000&acode=549937',
    getserveruri: function (requestname) {
      return 'http://localhost:34413/' + requestname + '?format=json&userid=1000&acode=549937';
    }
  })
;
