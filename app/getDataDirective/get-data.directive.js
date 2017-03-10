angular.module('chartMakerModule').directive("getData", function () {
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
                    }
                },
                onRemoveLabelClick: function (labelToDelete) {
                    $scope.Data.pieDetails.labels.splice(_.indexOf($scope.Data.pieDetails.labels,labelToDelete),1);
                    $scope.Data.pieDetails.data.splice(_.indexOf($scope.Data.pieDetails.labels,labelToDelete),1);

                },
                onAddDataClick: function (newData) {
                    $scope.Data.newData = 0;
                    $scope.Data.pieDetails.data[$scope.indexOfLabel] = newData;
                },
                generateByType: function () {
                    $scope.Data.data = $scope.Data.pieDetails.data;
                    $scope.Data.labels = $scope.Data.pieDetails.labels;
                }
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