
angular.module('chartMakerModule').controller('chartMakerController',['$scope','$state','$interval','$rootScope', function ($scope,$state,$interval,$rootScope) {
    // $state.go('home');
    $scope.appTitle = "Chart Maker App";
    $scope.appVersion = '1.0';
    $scope.menuItems = [
        {title: 'Pie Chart', href: 'home.pieChart'},
        {title: 'Bar Chart', href: 'home.barChart'}
    ];
    createChart();
    $interval(createChart, 2000);
    ($state.current.name == "home")?$scope.buttonText="Let's Go!":$scope.buttonText="Now We Can Do It !";

    function createChart () {
        $scope.data = [];
        for (var i = 0; i < 50; i++) {
            $scope.data.push([{
                x: randomScalingFactor(),
                y: randomScalingFactor(),
                r: randomRadius()
            }]);
        }
    }
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options){
            (toState.name == "home")?$scope.buttonText="Let's Go!":$scope.buttonText="Now We Can Do It !";
        });
    function randomScalingFactor () {
        return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
    }

    function randomRadius () {
        return Math.abs(randomScalingFactor()) / 4;
    }

    var maximum = document.getElementById('container').clientWidth / 2 || 300;
    $scope.topData = [[]];
    $scope.topLabels = [];
    $scope.topOptions = {
        animation: {
            duration: 0
        },
        elements: {
            line: {
                borderWidth: 0.5
            },
            point: {
                radius: 0
            }
        },
        legend: {
            display: false
        },
        scales: {
            xAxes: [{
                display: false
            }],
            yAxes: [{
                display: false

            }],
            gridLines: {
                display: false
            }
        },
        tooltips: {
            enabled: false
        }
    };

    // Update the dataset at 25FPS for a smoothly-animating chart
    $interval(function () {
        getLiveChartData();
    }, 40);

    function getLiveChartData () {
        if ($scope.topData[0].length) {
            $scope.topLabels = $scope.topLabels.slice(1);
            $scope.topData[0] = $scope.topData[0].slice(1);
        }

        while ($scope.topData[0].length < maximum) {
            $scope.topLabels.push('');
            $scope.topData[0].push(getRandomValue($scope.topData[0]));
        }
    }

    function getRandomValue (data) {
        var l = data.length, previous = l ? data[l - 1] : 50;
        var y = previous + Math.random() * 10 - 5;
        return y < 0 ? 0 : y > 100 ? 100 : y;
    }
}]);
