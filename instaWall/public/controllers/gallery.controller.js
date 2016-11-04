"use strict"

angular.module("instaApi")
    .controller("GalleryCtrl", ["$scope", "instagram", "$resource", function($scope, instagram, $resource) {
        $scope.images = [];

        instagram.fetchPic(function(data) {
            $scope.images = data;
        })

        $scope.showEmb = function(img) {
            var div = document.querySelector(".emb");

            var emb = $resource("https://api.instagram.com/oembed/?url=:shortLink");
            emb.get({shortLink: img.link}, function(data) {
                div.innerHTML = data.html;

                // fix instagram embed issue
                setTimeout(function() {
                    var div = document.querySelector(".emb").querySelector("div").querySelector("div");

                    div.innerHTML = "<img src='" + data.thumbnail_url + "'/>";
                    div.style.padding = "0px";
                    
                    var avatar = $scope.images[0].user.profile_picture;
                    var node = document.createElement("img");
                    var aTag = div.parentNode.querySelector("a");
                    node.setAttribute("src",avatar);
                    node.setAttribute("class", "userPic");

                    aTag.setAttribute("class", "userName");

                    div.parentNode.appendChild(node);

                    // set embed div width
                    var orinW = document.body.clientWidth;
                    var div_emb = document.querySelector(".emb");
                    var img = div_emb.querySelector("img");
                    if(orinW < 700) {
                        div_emb.style.width = orinW - 50 + "px";
                        img.style.width = orinW - 70 + "px";
                    }else {
                        div_emb.style.width = "658px";
                        img.style.width = "638px";
                    }

                },50);

            });

            var mask = document.querySelector("#lightBoxMask");
            mask.style.display = "block";
            mask.onclick = function() {
                mask.style.display = "none";
                div.innerHTML = "";
            }
        }

    }])