'use strict';

angular.module('ngSocial.facebook', ['ngRoute', 'ngFacebook'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facebook', {
    templateUrl: 'facebook/facebook.html',
    controller: 'FacebookCtrl'
  });
}])

.config(function($facebookProvider) {
    $facebookProvider.setAppId('1303052729707065');
    $facebookProvider.setPermissions("user_photos, publish_actions, user_posts, email, public_profile");
})

.run(function($rootScope) {
    (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
})

.controller('FacebookCtrl', ['$scope', '$facebook', function($scope, $facebook) {
    $scope.limitation = 3;
    $scope.isLoggedIn = false;

    $scope.loadMore = function() {
        $scope.limitation += 3;
    }

    $scope.login = function() {
        $facebook.login().then(function() {
            console.log("Logged In...");

            $scope.isLoggedIn = true;
            refresh();
        });
    }

    $scope.logout = function() {
        $facebook.logout().then(function() {
            console.log("Logged out...");

            $scope.isLoggedIn = false;
            refresh();
        });
    }

    function refresh() {
        $facebook.api("/me?fields=id,name,email,first_name,last_name,gender,locale,picture,permissions,albums").then(function(response) {
            $scope.welcomeMsg = "Welcome " + response.name;
            $scope.isLoggedIn = true;
            $scope.userInfo = response;
            $scope.picture = response.picture.data.url;
            $scope.permissions = response.permissions.data;
            
            $facebook.api("/me/posts").then(function(response) {
                $scope.posts = response.data;
            });
        },

        function(err) {
            $scope.welcomeMsg = ""; 
        }),

        $scope.postStatus = function() {
            var body = this.body;

            alert("You sure you want to post\n" + '"' + body + '"' + "\non your facebook page?");

            $facebook.api("/me/feed", "post", {message: body}).then(function(response) {
                $scope.mgs = "Posted!";
                refresh();
            });
            this.body = "";
        }
    }
    refresh();
}]);