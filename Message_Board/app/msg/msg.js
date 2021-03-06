  'use strict';

  var config = {
        apiKey: "AIzaSyCKbhiUOyv5-Mb7P2fOk0XqeeDADNpjz4w",
        authDomain: "msg-board-5eaf2.firebaseapp.com",
        databaseURL: "https://msg-board-5eaf2.firebaseio.com",
        storageBucket: "",
        messagingSenderId: "236337303497"
      };
      firebase.initializeApp(config);

  angular.module("msgBoard.msgs", ["ngRoute", "firebase"])
    .config(["$routeProvider", function($routeProvider) {
      $routeProvider
        .when("/msg", {
          templateUrl: "msg/msg.html",
          controller: "MsgCtrl"
        });
    }])

    .controller("MsgCtrl", ["$scope", "$firebaseArray", "$firebaseObject", function($scope, $firebaseArray, $firebaseObject) {
      var root = firebase.database().ref("msg");
      var picRoot = firebase.database().ref("pic");

      $scope.limitation = 10;

      $scope.loadMore = function() {
        $scope.limitation += 10;
      }

      $scope.messages = $firebaseArray(root);
      $scope.pics = $firebaseObject(picRoot);

      $scope.getImgUrl = function(obj) {
        var name = obj;
        return $scope.pics[name];
      }

      $scope.showAddForm = function() {
        $scope.addFormShow = true;
        $scope.editFormShow = false;
      }

      $scope.showEditForm = function(message) {
        $scope.editFormShow = true;

        $scope.id = message.$id;
        $scope.name = message.name;
        $scope.content = message.content;
        $scope.pic = message.pic;
        $scope.lastedit = message.lastedit;
      }

      $scope.hide = function() {
        $scope.addFormShow = false;
        $scope.messageShow = false;
      }

      $scope.addFormSubmit = function() {
        var date = new Date();
        console.log("Adding Message...");
        if($scope.name) { var name = $scope.name; } else { var name = null; }
        if($scope.content) { var content = $scope.content; } else { var content = null; }
        if($scope.pic) { var pic = $scope.pic; } else { var pic = null; }

        $scope.messages.$add({
          name: name,
          content: content,
          date : date.getTime(),
          pic: pic,
          lastedit: ""
        })
        .then(function(root) {
          var id = root.child("message").push().key;
          console.log("Add Message with ID: " + id );

          clearFields();

          $scope.meg = "Message Added";
        })
      }

      $scope.editFormSubmit = function() {
        console.log("Updating Message...");
        var date = new Date();
        var id = $scope.id;

        var record = $scope.messages.$getRecord(id);
        
        record.name = $scope.name;
        record.content = $scope.content;
        record.lastedit = date.getTime();

        $scope.messages.$save(record).then(function(root) {
          console.log(root.key);
        });

        clearFields();

        $scope.editFormShow = false;

        $scope.msg = "Message Updated"
      }

      $scope.showMessage = function(message) {
        console.log("Getting Message...");

        $scope.name = message.name;
        $scope.content = message.content;

        $scope.messageShow = true; 
      }

      $scope.removeMessage = function(message) {
        console.log("Deleting Message...");

        $scope.messages.$remove(message);

        $scope.msg = "Message Removed";
      }

      $scope.closeBox = function() {
        $scope.editFormShow = false;
        $scope.addFormShow = false;
      }

      $scope.checkLastEdit = function(message) {
        if(message.lastedit != "") {
          return message.lastedit;
        }
      }

      function clearFields() {
        $scope.content = "";
      }
      
    }]);


  
