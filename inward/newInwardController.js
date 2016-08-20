angular.module('newInwardModule', ['toastr' ])
    .controller('newInwardController', function(toastr,$scope,$http) {

        var inwardEntry={};
        $http({
            method: 'GET',
            url: 'http://localhost:8080/party/all'
            //async: false
        }).success(function(data) {
            $scope.data = data;
        });


        $scope.getComponentList = function(party) {
            $scope.selectedParty=party;
            $scope.componentRecords=party.components;
        };

        $scope.save = function() {
            inwardEntry.component=$scope.selectedComponent;
            inwardEntry.qtyKgs=$scope.selectedComponent.qtyKgs;
            inwardEntry.qtyNos=$scope.selectedComponent.qtyNos;
            saveInward(inwardEntry);
        };

        saveInward = function(inwardEntry) {
            var url = 'http://localhost:8080/inward';
            $http.post(url,inwardEntry)
                .success(function(data) {//delete if success
                    toastr.success('Added Inward');
                    $scope.exportDataVariable = data;
                    $scope.selectedComponent={};
                }).error(function(data){
                toastr.error('Error in adding Inward');
            });
        };

    });