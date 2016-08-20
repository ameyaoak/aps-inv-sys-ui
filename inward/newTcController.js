angular.module('newTcModule', ['toastr' ])
    .controller('newTcController', function(toastr,$scope,$http,$routeParams) {

        var url = "http://localhost:8080/tc/"+$routeParams.tcNo;
        $http.get(url)
            .success(function(data) {//delete if success
                $scope.tc=data;
                $scope.gridRows=data.gridRows;
            }).error(function(data){
                toastr.error('Error in getting TC');
            });




        $scope.save = function() {
            var tcObject = $scope.tc;

            var url = 'http://localhost:8080/tc';
            $http.put(url,tcObject)
                .success(function(data) {//delete if success
                    toastr.success('Updated TC');
                    //$scope.exportDataVariable = data;
                }).error(function(data){
                    toastr.error('Error in updating TC');
                });
        };


    }) ;