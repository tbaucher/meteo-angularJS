'use strict';

let app = angular.module('myApp', []);

app.controller('apiCtrl', function ($scope, $http) {

  $http({
    method: 'GET',
    url: 'https://www.prevision-meteo.ch/services/json/rennes'
  }).then(function successCallback(response) {
    $scope.result = response.data;
    $scope.hour = response.data.fcst_day_0.hourly_data;
    $scope.mesHeures = [];
    var currentHour = new Date().getHours();
    for (let i in $scope.hour) {
      let j;
        if (i.length == 5) {
          j = parseInt(i.substring(0, 2))
        } else {
          j = parseInt(i.substring(0, 1))
        }
        if (j > (currentHour - 2)) {
          $scope.hour[i]["hour"] = i;
          $scope.mesHeures.push($scope.hour[i]);
        }
    }
  }, function errorCallback(response) {
    console.log("get request failed");
  });


  $scope.getMeteo = function (query) {

    $http({
      method: 'GET',
      url: 'https://www.prevision-meteo.ch/services/json/' + query
    }).then(function successCallback(response) {
      var currentHour = new Date().getHours();
      $scope.result = response.data;
      $scope.hour = response.data.fcst_day_0.hourly_data;
      $scope.mesHeures = [];
      for (let i in $scope.hour) {
        let j;
        if (i.length == 5) {
          j = parseInt(i.substring(0, 2))
        } else {
          j = parseInt(i.substring(0, 1))
        }
        if (j > (currentHour - 2)) {
          $scope.hour[i]["hour"] = i;
          $scope.mesHeures.push($scope.hour[i]);
        }
      }
    }, function errorCallback(response) {
      console.log(response.data);
    });
  }

  $scope.isCurrentHour = function (hour) {
    var currentHour = new Date().getHours();
    if (hour.length == 5) {
      hour = hour.substring(0, 2)
    } else {
      hour = hour.substring(0, 1)
    }
    if (hour == currentHour) {
      return true;
    } else {
      return false;
    }
  }

  $scope.myStyle = function(hour){
    var currentHour =  new Date().getHours() + "H00";
    if (currentHour==hour){
      return {'background-color': 'gainsboro'}
    }
  }

});