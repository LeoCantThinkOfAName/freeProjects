  'use strict';

  var config = {
        apiKey: "AIzaSyD_12WfHECSUbeZudXpESkZl2W2q9HCmJI",
        authDomain: "msg-board-8853a.firebaseapp.com",
        databaseURL: "https://msg-board-8853a.firebaseio.com",
        storageBucket: "msg-board-8853a.appspot.com",
        messagingSenderId: "1095194717403"
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

    .controller("MsgCtrl", ["$scope", "$firebaseArray", function($scope, $firebaseArray) {
      var root = firebase.database().ref();

      $scope.limitation = 10;

      $scope.loadMore = function() {
        $scope.limitation += 10;
      }

      $scope.messages = $firebaseArray(root);

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
          pic: pic
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

        var id = $scope.id;

        var record = $scope.messages.$getRecord(id);
        
        record.name = $scope.name;
        record.content = $scope.content;

        $scope.messages.$save(record).then(function(root) {
          console.log(root.key);
        });

        clearFields();

        $scope.editFormShow = false;

        $scope.msg = "Contact Updated"
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

      function clearFields() {
        $scope.content = "";
      }

    }]);

