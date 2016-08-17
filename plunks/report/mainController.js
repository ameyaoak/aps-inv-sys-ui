angular.module('mainModule', [ ])
.factory('Toddler', function($resource) {
  return $resource('data.json');
}) 

.controller('mainController', function($scope,$http) {
    $http.get('data.json')       
        .success(function(data) {      
            $scope.inv = data;  
            //$scope.chartConfig = initChartConfig(data);
        })
        .error(function (data, status, headers, config) {
            alert("error reading json");
        });  
		// create a message to display in our view
		$scope.message = 'Everyone come and see how good I look!';
	})

    .directive('chart', chartDirective)

    .controller('MainCtrl', function($scope,$http) {
        $scope.name = 'World';
        $http.get('data.json')
            .success(function(data) {
                $scope.inv = data;
                $scope.chartConfig = initChartConfig(data);
            })
            .error(function (data, status, headers, config) {
                alert("error reading json");
            });
    }).controller('ImageCtrl', function($scope) {
        $scope.image = null
        $scope.imageFileName = ''
    })


