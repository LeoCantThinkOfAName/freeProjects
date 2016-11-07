"use strict"

angular.module("instaWall")
    .controller("GalleryCtrl", ["$scope", "instagram", "$resource", function($scope, instagram, $resource) {
        $scope.images = [];

        instagram.fetchPic(function(data) {
            $scope.images = data;
        })

        $scope.showEmb = function(img) {
            var time = img.created_time;
            time = new Date().toISOString().slice(0,10);

            var emb = document.querySelector(".emb");
            var mask = document.querySelector("#lightBoxMask");

            emb.querySelector(".embOuter").style.display = "block";
            emb.querySelector(".mainPic").setAttribute("src", img.images.standard_resolution.url);
            emb.querySelector(".userPic").setAttribute("src", img.user.profile_picture);
            emb.querySelector(".userName").innerHTML = img.user.username ;
            emb.querySelector(".postOn").innerHTML = time;
            mask.style.display = "block";

            mask.onclick = function() {
                emb.querySelector(".embOuter").style.display = "none";
                mask.style.display = "none";
            }

            // init lightbox size
            var winW = window.innerWidth;
            if(winW < 700) {
                emb.querySelector(".mainPic").style.width = winW - 100 + "px";
            }
        }

    }])