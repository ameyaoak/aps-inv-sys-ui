 angular.module('mainModule', ['toastr' ])
    .controller('mainController', function(toastr,$scope,$http,$routeParams) {

        var url = "http://localhost:8080/inward/"+$routeParams.invoiceNo;
        $http.get(url)
            .success(function(data) {//delete if success
                $scope.inv=data;
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


    })