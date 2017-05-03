angular.module('newTcModule', ['toastr' ])
    .controller('newTcController', function(toastr,$scope,$http,$routeParams) {

        var baseUrl='http://apsinvoice-pc:8080';

        var url = baseUrl+"/tc/"+$routeParams.tcNo;
        $http.get(url)
            .success(function(data) {//delete if success
                $scope.tc=data;
                $scope.gridRows=data.gridRows;
            }).error(function(data){
                toastr.error('Error in getting TC');
            });




        $scope.save = function() {
            var tcObject = $scope.tc;

            var url = baseUrl+'/tc';
            $http.put(url,tcObject)
                .success(function(data) {//delete if success
                    toastr.success('Updated TC');
                    //$scope.exportDataVariable = data;
                }).error(function(data){
                    toastr.error('Error in updating TC');
                });
        };


    }) ;