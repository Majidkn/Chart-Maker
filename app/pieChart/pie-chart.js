angular.module('chartMakerModule').controller("pieChartController", function ($scope) {
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


    $scope.Func = {
        onAddLabelClick: function (newLabel) {
            $scope.indexOfLabel = _.indexOf($scope.Data.pieDetails.labels,newLabel);
            if (newLabel && $scope.indexOfLabel == -1){
                $scope.Data.pieDetails.labels.push(newLabel);
                $scope.Data.pieDetails.data.push(0);
                $scope.indexOfLabel = _.indexOf($scope.Data.pieDetails.labels,newLabel);
                $scope.Data.newLabel = "";
            }
        },
        onRemoveLabelClick: function (labelToDelete) {
            $scope.Data.pieDetails.labels.splice(_.indexOf($scope.Data.pieDetails.labels,labelToDelete),1);
            $scope.Data.pieDetails.data.splice(_.indexOf($scope.Data.pieDetails.labels,labelToDelete),1);
        },
        onAddDataClick: function (newData,index) {
            $scope.Data.pieDetails.data[index] = newData;
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
});