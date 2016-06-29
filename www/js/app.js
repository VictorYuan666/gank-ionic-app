// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ngCordova','ionic','starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if (window.cordova && window.cordova.InAppBrowser) {
        window.open = window.cordova.InAppBrowser.open;
      }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

  });
})
.config(function($stateProvider, $urlRouterProvider) {
   $stateProvider

     .state('app', {
       url: "/app",
       abstract: true,
       templateUrl: "templates/slideMenu.html",
       controller: 'AppCtrl'
     })

     .state('app.fuli', {
       url: "/fuli",
       views: {
         'menuContent' :{
           templateUrl: "templates/fuli.html",
           controller: 'FuliCtrl'
         }
       }
     })

     .state('app.web', {
       url: "/web",
       views: {
         'menuContent' :{
           templateUrl: "templates/web.html",
           controller: 'WebCtrl'
         }
       }
     })
     .state('app.ios', {
       url: "/ios",
       views: {
         'menuContent' :{
           templateUrl: "templates/iOS.html",
           controller: 'IOSCtrl'
         }
       }
     })
     .state('app.android', {
       url: "/android",
       views: {
         'menuContent' :{
           templateUrl: "templates/android.html",
           controller: 'AndroidCtrl'
         }
       }
     })
     .state('app.expand', {
       url: "/expand",
       views: {
         'menuContent' :{
           templateUrl: "templates/expand.html",
           controller: 'ExpandCtrl'
         }
       }
     })
     .state('app.recommend', {
       url: "/recommend",
       views: {
         'menuContent' :{
           templateUrl: "templates/recommend.html",
           controller: 'RecommendCtrl'
         }
       }
     })
     .state('app.appRecommend', {
       url: "/appRecommend",
       views: {
         'menuContent' :{
           templateUrl: "templates/appRecommend.html",
           controller: 'AppRecommendCtrl'
         }
       }
     })
     .state('app.video', {
       url: "/video",
       views: {
         'menuContent' :{
           templateUrl: "templates/video.html",
           controller: 'VideoCtrl'
         }
       }
     })
     .state('app.about', {
       url: "/about",
       views: {
         'menuContent' :{
           templateUrl: "templates/about.html",
           controller: 'AboutCtrl'
         }
       }
     });


   // if none of the above states are matched, use this as the fallback
   $urlRouterProvider.otherwise('/app/fuli');
 });
