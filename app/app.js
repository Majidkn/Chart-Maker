angular.module('chartMakerModule',['chart.js','ui.bootstrap']);

angular.module('chartMakerModule').controller('chartMakerController',['$scope' , function ($scope) {

    $scope.appTitle = "Chart Maker App";
    $scope.appVersion = '1.0';

}]);