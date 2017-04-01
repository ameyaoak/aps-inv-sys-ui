angular.module('componentModule', ['tcTableModule', 'toastr'])
    .controller('componentControllers', function (toastr, $scope, $http) {

        $scope.editParty = false;
        $http({
            method: 'GET',
            url: 'http://apsinvoice-pc:8080/party/all'
            //async: false
        }).success(function (data) {
            $scope.data = data;
        });


        $scope.getComponentList = function (party) {
            $scope.selectedParty = party;
            $scope.componentRecords = party.components;
        };

        $scope.updateData = function () {
            $http({
                method: 'GET',
                url: 'http://apsinvoice-pc:8080/party/all'
                //async: false
            }).success(function (data) {
                $scope.data = data;
                $scope.selectedComponent = {};
            });
        };

        $scope.update = function () {
            var id = $scope.selectedComponent.componentId;
            var payload = $scope.selectedComponent;
            var url = 'http://apsinvoice-pc:8080/component/' + id;
            $http.put(url, payload)
                .success(function (data) {
                    toastr.success("Update Success");
                    //$scope.updateData();
                }).error(function (data) {
                    toastr.error("Cannot Update");
                });
        };

        $scope.save = function () {
            console.log($scope.newparty);
            $scope.selectedComponent.partyId = $scope.selectedParty.partyId;
            $scope.selectedComponent.partyName = $scope.selectedParty.partyName;
            var payload = $scope.selectedComponent;
            var url = 'http://apsinvoice-pc:8080/component/';
            $http.post(url, payload)
                .success(function (data) {
                    toastr.success("Insert Success");
                    $scope.selectedComponent = {};
                    // $scope.updateData();
                }).error(function (data) {
                    toastr.error("Cannot Update");
                });
        };


    });
