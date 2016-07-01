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
$scope.slideChanged=function (index) {
  $scope.activeSlide = index;
  console.log(index);
};
  $scope.onSwipeUp = function() {
    var myPopup = $ionicPopup.show({
      title: '下载图片',
      template: '是否下载当前图片？',
      scope: $scope,
      buttons: [{
        text: '取消'
      }, {
        text: '<b>确定</b>',
        type: 'button-positive',
      }, ]
    });
    myPopup.then(function(res) {


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
            $cordovaFileTransfer.download(url, cordova.file.externalRootDirectory+'gankPic/' + localFileName, options, true)
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
                console.log(Math.round((progress.loaded / progress.total) * 100)+'%');

              });

          }, fail);

        }, fail);
      };

      function fail(error) {
        console.log(error);
      }
      dd();

      /*********上传图片***************/
      function uploadFile() {
        var imageURI = pickUrl;
        if (!imageURI)
          alert('请先选择本地图片');
        var options = new FileUploadOptions();
        options.fileKey = "file";
        options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";
        var ft = new FileTransfer();
        ft.upload(
          imageURI,
          encodeURI('http://192.168.93.114:1988/shandongTree/upload.jsp'),
          function() {
            alert('上传成功!');
          },
          function() {
            alert('上传失败!');
          },
          options);
      }

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
  });
