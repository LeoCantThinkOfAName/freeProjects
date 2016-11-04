"use strict";
angular.module("instaApi", ["ngRoute", "ngResource"])
    .config(["$routeProvider", function($routeProvider) {
        $routeProvider
            .when("/gallery", {
                templateUrl: "views/gallery.view.html",
                controller: "GalleryCtrl"
            })
            .otherwise({redirectTo: "/gallery"});
    }])