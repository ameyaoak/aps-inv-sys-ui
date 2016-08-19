angular.module('partyModule', ['toastr' ])
.controller('partyController', function(toastr,$scope,$http) {
   
   $scope.editParty = false;
       $http({ 
      method: 'GET',  
      url: 'http://localhost:8080/party/all'
        //async: false
    }).success(function(data) {   
      $scope.parties = data; 
     // $scope.compos = data.component;


           $scope.clearFields = function(){
               $scope.parties = '';
           };

           $scope.update = function()
           {
               var id = $scope.party.selectedOption.partyId;
               var payload = $scope.party.selectedOption;
               var url = 'http://localhost:8080/party/'+id
               $http.put(url,payload)
                   .success(function(data) {
                       toastr.success('Update Success');
                       //$scope.parties[id-1]=data;
                   }).error(function(data){
                       toastr.error("Cannot Update");
               });
           };

           $scope.save = function()
           {
               console.log($scope.party.selectedOption);
               var payload = $scope.party.selectedOption;
               var url = 'http://localhost:8080/party/'
               $http.post(url,payload)
                   .success(function(data) {
                       toastr.success("Insert Success");
                       //$scope.party.selectedOption={};
                   }).error(function(data){
                       toastr.error("Cannot Update");
                   });
           };




    
    }).error(function(data){
      console.log(data);  
    });  
    
	}) 
.directive('partyInput', function() {
  return {
    restrict: 'E',
    templateUrl: 'partyInput.html', 
    link: function(scope, elem, attrs) {   
      scope.editParty = false;    
    }

  };
})