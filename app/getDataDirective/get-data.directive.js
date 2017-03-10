angular.module('chartMakerModule').directive("getData", function ($interval) {
    return {
        restrict: 'EA',
        templateUrl: 'app/getDataDirective/get-data.tpl.html',
        scope: {

        },
        controller: function ($scope) {

            $scope.Data = {
                chartTypes: ['Pie'],
                selectedType: null,
                pieDetails: {
                    data: [],
                    labels: []
                },
                newData: 0,
                data: [],
                labels: []
            };

            createChart();
            $interval(createChart, 2000);

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
                        display: false,
                        tracks: {
                            max: 100
                        }
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
            $scope.Func = {
                onSelectChartType: function (chartType) {
                    $scope.Data.selectedType = chartType;
                    $scope.Func.checkDataOnChart();
                },
                checkDataOnChart: function () {
                    switch ($scope.Data.selectedType){
                        case "Pie":
                            break;
                        default:
                            break;
                    }
                },
                onAddLabelClick: function (newLabel) {
                    $scope.indexOfLabel = _.indexOf($scope.Data.pieDetails.labels,newLabel);
                    if (newLabel && $scope.indexOfLabel == -1){
                        $scope.Data.pieDetails.labels.push(newLabel);
                        $scope.indexOfLabel = _.indexOf($scope.Data.pieDetails.labels,newLabel);
                        $scope.Data.pieDetails.data.push(0);
                        $scope.Data.newLabel = "";
                        $scope.Data.dataAdded = false;
                    }
                },
                onRemoveLabelClick: function (labelToDelete) {
                    $scope.Data.pieDetails.labels.splice(_.indexOf($scope.Data.pieDetails.labels,labelToDelete),1);
                    $scope.Data.pieDetails.data.splice(_.indexOf($scope.Data.pieDetails.labels,labelToDelete),1);

                },
                onAddDataClick: function (newData) {
                    $scope.Data.pieDetails.data[$scope.indexOfLabel] = newData;
                    $scope.Data.dataAdded = true;
                },
                generateByType: function () {
                    console.log($scope.Data.pieDetails.data, $scope.Data.pieDetails.labels);
                    $scope.Data.data = $scope.Data.pieDetails.data;
                    $scope.Data.labels = $scope.Data.pieDetails.labels;
                },
            };

            $scope.Api = {};

            var Run = function () {

            };
            Run();

        },
        link: function (scope, element, attrs, ctrls) {
        }
    };
});