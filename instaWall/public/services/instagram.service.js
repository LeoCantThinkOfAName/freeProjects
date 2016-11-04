angular.module("instaApi")
    .factory("instagram", function($resource) {
        return {
            fetchPic: function(callback) {
                var api = $resource("https://api.instagram.com/v1/users/self/media/recent/?&client_id=:client_id&callback=JSON_CALLBACK&access_token=:access_token", {
                    client_id: "a83ee09ed6834c04ad7f4a07efb8136f",
                    access_token: "698940771.1677ed0.b402c72193a146358884ba7d765b7640"
                },
                {
                    fetch: {method: "JSONP"}
                });

                api.fetch(function(response) {
                    callback(response.data);
                })
            }
        }
    })