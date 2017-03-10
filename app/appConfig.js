angular.module('chartMakerModule',['chart.js','ui.bootstrap','ui.router','angular-loading-bar','ui.keypress']).config(['$stateProvider',
    function ($stateProvider) {
        var mainStates = [
            {
                state: 'home',
                config: {
                    url: '',
                    templateUrl: 'app/index.html',
                    controller: 'chartMakerController'

                }
            },
            {
                state: 'home.pieChart',
                config: {
                    url: '/pieChart',
                    templateUrl: 'app/pieChart/pie-chart.tpl.html',
                    controller: 'pieChartController'
                }
            }
        ];
        mainStates.forEach(function (state) {
            $stateProvider.state(state.state, state.config);
        });
    }]);
