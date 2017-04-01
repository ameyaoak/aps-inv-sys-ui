angular.module('partyModule', ['toastr'])
    .controller('partyController', function (toastr, $scope, $http) {

        $scope.editParty = false;
        $http({
            method: 'GET',
            url: 'http://apsinvoice-pc:8080/party/all'
            //async: false
        }).success(function (data) {
            $scope.parties = data;


            $scope.clearFields = function () {
                $scope.parties = '';
            };

            $scope.update = function () {
                var id = $scope.party.selectedOption.partyId;
                var payload = $scope.party.selectedOption;
                var url = 'http://apsinvoice-pc:8080/party/' + id;
                $http.put(url, payload)
                    .success(function (data) {
                        toastr.success('Party Updated Successfully');
                    }).error(function (data) {
                        toastr.error("Cannot Update Party");
                    });
            };

            $scope.save = function () {
                console.log($scope.party.selectedOption);
                var payload = $scope.party.selectedOption;
                var url = 'http://apsinvoice-pc:8080/party/';
                $http.post(url, payload)
                    .success(function (data) {
                        toastr.success("Party Added Successfully");
                    }).error(function (data) {
                        toastr.error("Cannot Save Party");
                    });
            };


        }).error(function (data) {
            toastr.success('Cannot Read Party');
        });

    }) ;