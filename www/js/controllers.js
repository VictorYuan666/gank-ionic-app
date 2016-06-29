angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, myService) {

})

.controller('FuliCtrl', function($scope, $ionicModal, $http, $ionicActionSheet,$ionicPopup, $timeout, httpService) {
  var url = 'http://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/';
  var page = 2;
  // var url = 'data.json';
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
      console.log(data);
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
  //
  $scope.onSwipeUp = function() {
    var myPopup = $ionicPopup.show({
             title: '设为壁纸',
             template: '是否把当前图片设为壁纸？',
             scope: $scope,
             buttons: [
               { text: '取消' },
               {
                 text: '<b>确定</b>',
                 type: 'button-positive',
               },
             ]
           });
           myPopup.then(function(res) {
             console.log('Tapped!', res);
           });


  };
})

.controller('WebCtrl', function($scope, $http, $timeout, httpService, myService) {
    var url = 'http://gank.io/api/data/%E5%89%8D%E7%AB%AF/10/';
    var page = 2;
    // var url = 'data.json';
    $scope.webDatas = [];
    $scope.pageTitle = "前端";

    // $http({
    //   url: 'http://apis.baidu.com/txapi/mvtp/meinv?num=10',
    //   method: 'GET',
    //   headers: {
    //     'apikey': '4228025fb23c56c0218c0c5ba28195d5'
    //   },
    // }).success(function(picBgData, header, config, status) {
    //   //响应成功
    //   console.log(picBgData);
    //   $scope.beautyBg = picBgData.newslist;
    //   angular.forEach($scope.webDatas, function(data, index, array) {
    //     //data等价于array[index]
    //     data.picUrl = picBgData.newslist[index].picUrl;
    //     console.log(data);
    //   });
    //
    // }).error(function(data, header, config, status) {
    //   //处理响应失败
    //   console.log(data);
    // });

    // console.log(myService.imageDatas);
    // $scope.galleryDatas = myService.imageDatas();

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
  .controller('AboutCtrl', function($scope) {
    $scope.pageTitle = "关于";
  });
