angular.module('starter.services', [])
  .factory('myService', function($http) {
    var imageDatas = null;
    (function() {
      $http({
        url: 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9/100/1',
        method: 'GET',
      }).success(function(picBgData, header, config, status) {

        // console.log(picBgData.results);
        imageDatas = picBgData.results;
      });
    })();
    var randomImageUrl = function() {
      var n = Math.floor(Math.random() * imageDatas.length + 1) - 1;
      return imageDatas[n].url;
    };

    return {
      imageDatas: function() {
        return imageDatas;
      },
      randomImageUrl: function() {
        return randomImageUrl();
      }
    };
  })
  .factory('httpService', function($http, $injector) {
    var doGetRequest = function(url, success, err) {
      $http({
        url: url,
        method: 'GET'
      }).success(function(data, header, config, status) {
        //响应成功
        success(data.results);

      }).error(function(data, header, config, status) {
        //处理响应失败
        console.log(data);
        err(data);
      });
    };
    return {
      dataList: function(url, success, err) {
        return doGetRequest(url, success, err);

      }
    };
  })
  .factory('wechatService', function($injector) {
    var shareToWechat = function(options) {
      Wechat.isInstalled(function(installed) {
        console.log(installed);
        if (installed === 0) {
          $cordovaToast.showLongBottom("微信未安装(⊙o⊙)…");
        } else {
          Wechat.share({
            message: {
              title: options.title?options.title:'',
              description: options.description?options.description:'',
              thumb: options.thumb?options.thumb:'',
              mediaTagName: "TEST-TAG-001",
              messageExt: "这是第三方带的测试字段",
              messageAction: "<action>dotalist</action>",
              media: options.media
            },
            scene: options.scene //Wechat.Scene.TIMELINE  FAVORITE: 2 SESSION: 0 TIMELINE: 1
          }, function() {
            $cordovaToast.showLongBottom("成功分享到微信！O(∩_∩)O");
          }, function(reason) {
            $cordovaToast.showLongBottom(reason);
          });
        }

      }, function(reason) {
        console.log(reason);
        alert("Failed: " + reason);
      });

    };
    return {
      shareToWechat: function(options) {
        return shareToWechat(options);

      }
    };
  });
