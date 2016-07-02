angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, myService) {

})

.controller('FuliCtrl', function($scope, $ionicModal, $http, $ionicActionSheet, $ionicPopup, $timeout, $cordovaFileTransfer, $cordovaToast, httpService) {
  var url = 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/';
  var page = 2;
  $scope.items = [];

  $scope.doRefresh = function() {
    httpService.dataList(url + "1", function(data) {
      console.log(data);
      $scope.items = data;
      $scope.$broadcast('scroll.refreshComplete');
    }, function(data) {
      console.log(data);
    });
  };
  $scope.doRefresh();

  $scope.loadMore = function() {
    httpService.dataList(url + (page++), function(data) {
      // console.log(data);
      $scope.items = $scope.items.concat(data);
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }, function(data) {
      console.log(data);
    });


  };

  $scope.$on('stateChangeSuccess', function() {
    $scope.loadMore();
  });
  $scope.showImages = function(index) {
    $scope.activeSlide = index;
    $scope.showModal('templates/image-popover.html');
  };

  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };

  // Close the modal
  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove();
  };
  $scope.slideChanged = function(index) {
    $scope.activeSlide = index;
    console.log(index);
  };

  var shareToWechat = function(options) {
    Wechat.isInstalled(function(installed) {
      console.log(installed);
      if (installed === 0) {
        $cordovaToast.showLongBottom("微信未安装(⊙o⊙)…");
      } else {
        Wechat.share({
          message: {
            title: "Title",
            description: "description.",
            thumb: $scope.items[$scope.activeSlide].url,
            mediaTagName: "TEST-TAG-001",
            messageExt: "这是第三方带的测试字段",
            messageAction: "<action>dotalist</action>",
            media: {
              type: Wechat.Type.IMAGE,
              image: $scope.items[$scope.activeSlide].url
            }
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
  $scope.onSwipeUp = function() {
    console.log(Wechat);
    $ionicActionSheet.show({
      titleText: '更多操作',
      buttons: [{
        text: '<span><i class="icon-friend-open"></i>分享到微信朋友圈</span> '
      }, {
        text: '<span><i class="icon-wechat-open"></i>分享给微信好友</span> '
      }, {
        text: '<span><i class="icon-weibo-open"></i>分享到微博</span> '
      }, {
        text: '<span><i class="icon-download"></i>下载到本地</span>'
      }, {
        text: '<span><i class="icon-cancel"></i>取消</span>'
      }],

      buttonClicked: function(index) {
        switch (index) {
          case 0:
            //分享到微信朋友圈
            shareToWechat({
              scene: 1
            });

            break;
          case 1:

            shareToWechat({
              scene: 0
            });
            break;

          case 2:
            // console.log(YCWeibo);

            var shareToWeibo = function() {

              window.weibo.isInstalled(function(status) {

                if (status) {
                  window.weibo.share({
                    type: 'image',
                    data: $scope.items[$scope.activeSlide].url,
                    text: '通过干货集中营客户端分享给你一张美图~(≧▽≦)/~'
                  }, function(res) {
                    $cordovaToast.showLongBottom(res);
                  });
                } else {
                  $cordovaToast.showLongBottom("请先安装微博官方客户端o(╯□╰)o");

                }

              });


            };
            shareToWeibo();
            // YCWeibo.checkClientInstalled(function() {
            //   console.log('client is installed');
            //
            //   var args = {};
            //   args.url = "$scope.items[$scope.activeSlide].url";
            //   args.title = "分享了一张美图给你呦";
            //   args.description = "通过干货集中营客户端分享给你";
            //   args.imageUrl = "https://www.baidu.com/img/bdlogo.png"; //if you don't have imageUrl,for android http://www.sinaimg.cn/blog/developer/wiki/LOGO_64x64.png will be the defualt one
            //   args.defaultText = "";
            //   YCWeibo.shareToWeibo(function() {
            //     alert("share success");
            //   }, function(failReason) {
            //     alert(failReason);
            //   }, args);
            //
            //
            // }, function() {
            //   console.log('client is not installed');
            // });

            break;
          case 3:
            //下载到本地
            var dd = function() {
              window.requestFileSystem(window.TEMPORARY, 5 * 1024 * 1024, function(fs) {
                console.log(fs.root.fullPath);
                fs.root.getDirectory("gankPic", {
                    create: true
                  },
                  function(fileEntry) {},
                  function() {
                    console.log("创建目录失败");
                  });

                console.log('file system open: ' + cordova.file.externalRootDirectory);

                // Make sure you add the domain name to the Content-Security-Policy <meta> element.
                var url = $scope.items[$scope.activeSlide].url;
                var localFileName = url.substring(url.lastIndexOf('/') + 1);
                // Parameters passed to getFile create a new file or return the file if it already exists.
                fs.root.getFile(localFileName, {
                  create: true,
                  exclusive: false
                }, function(fileEntry) {
                  console.log(fileEntry);
                  var options = {};
                  $cordovaFileTransfer.download(url, cordova.file.externalRootDirectory + 'gankPic/' + localFileName, options, true)
                    .then(function(result) {
                      console.log(result);
                      // Success!
                      $cordovaToast.showLongBottom('图片已经下到gankPic文件夹下了哦(╯3╰)').then(function(success) {
                        // success
                      }, function(error) {
                        // error
                      });
                    }, function(err) {
                      console.log(err);
                      // Error
                      $cordovaToast.showLongBottom('图片下载失败！请稍候再试o(╯□╰)o ').then(function(success) {
                        // success
                      }, function(error) {
                        // error
                      });
                    }, function(progress) {
                      console.log(Math.round((progress.loaded / progress.total) * 100) + '%');

                    });

                }, fail);

              }, fail);
            };

            function fail(error) {
              console.log(error);
            }
            dd();
            break;
          case 2:
            //取消

            break;
          default:


        }
        return true;
      },

    });
  };

})

.controller('WebCtrl', function($scope, $http, $timeout, httpService, myService) {
    var url = 'http://gank.io/api/data/%E5%89%8D%E7%AB%AF/10/';
    var page = 2;
    // var url = 'data.json';
    $scope.webDatas = [];
    $scope.pageTitle = "前端";


    $scope.openLink = function(url) {
      console.log(url);
      window.open(url, '_blank', 'location=yes');
    };
    $scope.doRefresh = function() {
      httpService.dataList(url + "1", function(datas) {
        angular.forEach(datas, function(data, index, array) {
          data.picUrl = myService.randomImageUrl();
        });
        $scope.webDatas = datas;
        $scope.$broadcast('scroll.refreshComplete');
      }, function(data) {
        console.log(data);
      });
    };
    $scope.doRefresh();
    $scope.loadMore = function() {
      httpService.dataList(url + (page++), function(datas) {
        angular.forEach(datas, function(data, index, array) {
          data.picUrl = myService.randomImageUrl();
        });
        $scope.webDatas = $scope.webDatas.concat(datas);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function(data) {
        console.log(data);
      });
    };

    $scope.$on('stateChangeSuccess', function() {
      $scope.loadMore();
    });
  })
  .controller('IOSCtrl', function($scope, $http, httpService, myService) {
    var url = 'http://gank.io/api/data/iOS/10/';
    var page = 2;
    $scope.webDatas = [];
    $scope.pageTitle = "iOS";
    $scope.openLink = function(url) {
      console.log(url);
      window.open(url, '_blank', 'location=yes');
    };
    $scope.doRefresh = function() {
      httpService.dataList(url + "1", function(datas) {
        angular.forEach(datas, function(data, index, array) {
          data.picUrl = myService.randomImageUrl();
        });
        $scope.webDatas = datas;
        $scope.$broadcast('scroll.refreshComplete');
      }, function(data) {
        console.log(data);
      });
    };
    $scope.doRefresh();
    $scope.loadMore = function() {
      httpService.dataList(url + (page++), function(datas) {
        angular.forEach(datas, function(data, index, array) {
          data.picUrl = myService.randomImageUrl();
        });
        $scope.webDatas = $scope.webDatas.concat(datas);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function(data) {
        console.log(data);
      });
    };

    $scope.$on('stateChangeSuccess', function() {
      $scope.loadMore();
    });
  })
  .controller('AndroidCtrl', function($scope, $http, httpService, myService) {
    var url = 'http://gank.io/api/data/Android/10/';
    var page = 2;
    $scope.webDatas = [];
    $scope.pageTitle = "Android";
    $scope.openLink = function(url) {
      console.log(url);
      window.open(url, '_blank', 'location=yes');
    };
    $scope.doRefresh = function() {
      httpService.dataList(url + "1", function(datas) {
        angular.forEach(datas, function(data, index, array) {
          data.picUrl = myService.randomImageUrl();
        });
        $scope.webDatas = datas;
        $scope.$broadcast('scroll.refreshComplete');
      }, function(data) {
        console.log(data);
      });
    };
    $scope.doRefresh();
    $scope.loadMore = function() {
      httpService.dataList(url + (page++), function(datas) {
        angular.forEach(datas, function(data, index, array) {
          data.picUrl = myService.randomImageUrl();
        });
        $scope.webDatas = $scope.webDatas.concat(datas);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function(data) {
        console.log(data);
      });
    };

    $scope.$on('stateChangeSuccess', function() {
      $scope.loadMore();
    });
  })
  .controller('ExpandCtrl', function($scope, $http, httpService, myService) {
    var url = 'http://gank.io/api/data/%E6%8B%93%E5%B1%95%E8%B5%84%E6%BA%90/10/';
    var page = 2;
    $scope.webDatas = [];
    $scope.pageTitle = "拓展资源";
    $scope.openLink = function(url) {
      console.log(url);
      window.open(url, '_blank', 'location=yes');
    };
    $scope.doRefresh = function() {
      httpService.dataList(url + "1", function(datas) {
        angular.forEach(datas, function(data, index, array) {
          data.picUrl = myService.randomImageUrl();
        });
        $scope.webDatas = datas;
        $scope.$broadcast('scroll.refreshComplete');
      }, function(data) {
        console.log(data);
      });
    };
    $scope.doRefresh();
    $scope.loadMore = function() {
      httpService.dataList(url + (page++), function(datas) {
        angular.forEach(datas, function(data, index, array) {
          data.picUrl = myService.randomImageUrl();
        });
        $scope.webDatas = $scope.webDatas.concat(datas);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function(data) {
        console.log(data);
      });
    };

    $scope.$on('stateChangeSuccess', function() {
      $scope.loadMore();
    });
  })
  .controller('VideoCtrl', function($scope, $http, httpService, myService) {
    var url = 'http://gank.io/api/data/%E4%BC%91%E6%81%AF%E8%A7%86%E9%A2%91/10/';
    var page = 2;
    $scope.webDatas = [];
    $scope.pageTitle = "休息视频";
    $scope.openLink = function(url) {
      console.log(url);
      window.open(url, '_blank', 'location=yes');
    };
    $scope.doRefresh = function() {
      httpService.dataList(url + "1", function(datas) {
        angular.forEach(datas, function(data, index, array) {
          data.picUrl = myService.randomImageUrl();
        });
        $scope.webDatas = datas;
        $scope.$broadcast('scroll.refreshComplete');
      }, function(data) {
        console.log(data);
      });
    };
    $scope.doRefresh();
    $scope.loadMore = function() {
      httpService.dataList(url + (page++), function(datas) {
        angular.forEach(datas, function(data, index, array) {
          data.picUrl = myService.randomImageUrl();
        });
        $scope.webDatas = $scope.webDatas.concat(datas);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function(data) {
        console.log(data);
      });
    };

    $scope.$on('stateChangeSuccess', function() {
      $scope.loadMore();
    });
  })
  .controller('RecommendCtrl', function($scope, $http, httpService, myService) {
    var url = 'http://gank.io/api/data/%E7%9E%8E%E6%8E%A8%E8%8D%90/10/';
    var page = 2;
    $scope.webDatas = [];
    $scope.pageTitle = "瞎推荐";
    $scope.openLink = function(url) {
      console.log(url);
      window.open(url, '_blank', 'location=yes');
    };
    $scope.doRefresh = function() {
      httpService.dataList(url + "1", function(datas) {
        angular.forEach(datas, function(data, index, array) {
          data.picUrl = myService.randomImageUrl();
        });
        $scope.webDatas = datas;
        $scope.$broadcast('scroll.refreshComplete');
      }, function(data) {
        console.log(data);
      });
    };
    $scope.doRefresh();
    $scope.loadMore = function() {
      httpService.dataList(url + (page++), function(datas) {
        angular.forEach(datas, function(data, index, array) {
          data.picUrl = myService.randomImageUrl();
        });
        $scope.webDatas = $scope.webDatas.concat(datas);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function(data) {
        console.log(data);
      });
    };

    $scope.$on('stateChangeSuccess', function() {
      $scope.loadMore();
    });
  })
  .controller('AppRecommendCtrl', function($scope, $http, httpService, myService) {
    var url = 'http://gank.io/api/data/App/10/';
    var page = 2;
    $scope.webDatas = [];
    $scope.pageTitle = "App推荐";
    $scope.openLink = function(url) {
      console.log(url);
      window.open(url, '_blank', 'location=yes');
    };
    $scope.doRefresh = function() {
      httpService.dataList(url + "1", function(datas) {
        angular.forEach(datas, function(data, index, array) {
          data.picUrl = myService.randomImageUrl();
        });
        $scope.webDatas = datas;
        $scope.$broadcast('scroll.refreshComplete');
      }, function(data) {
        console.log(data);
      });
    };
    $scope.doRefresh();
    $scope.loadMore = function() {
      httpService.dataList(url + (page++), function(datas) {
        angular.forEach(datas, function(data, index, array) {
          data.picUrl = myService.randomImageUrl();
        });
        $scope.webDatas = $scope.webDatas.concat(datas);
        $scope.$broadcast('scroll.infiniteScrollComplete');
      }, function(data) {
        console.log(data);
      });
    };

    $scope.$on('stateChangeSuccess', function() {
      $scope.loadMore();
    });
  })
  .controller('AboutCtrl', function($scope) {
    $scope.pageTitle = "关于";

    $scope.share = function() {
      var hideSheet = $ionicActionSheet.show({
        buttons: [{
          text: '<b>Share</b> This'
        }, {
          text: 'Move'
        }],
        destructiveText: 'Delete',
        titleText: 'Modify your album',
        cancelText: 'Cancel',
        cancel: function() {
          // add cancel code..
        },
        buttonClicked: function(index) {
          return true;
        }
      });
      $timeout(function() {
        hideSheet();
      }, 2000);
    };

    $scope.share1 = function() {


    };
  });
