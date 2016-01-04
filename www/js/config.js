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
    server: 'http://127.0.0.1:1314/',
  })
;
