angular.module('invoiceModule', ['chartModule' ])
.controller('invoiceController', function($scope,$http) { 
  $scope.invoice_fromdata="http://localhost:8080/invoice/all";
      $scope.invoice_headers="Creation Date,Invoice No,Dispatch Id, Inward No, Party, Component,Material,Qty/Kg,Qty/No,Rate/Kg,Rate/No,Total";
      $scope.invoice_fields="creationDate,invoiceNo,dispatchNo,inwardNo,party,component,material,qtyKgs,qtyNos,rateKg,rateNos,total";
  $scope.invoice_button1="Make Report";
	}) 
.directive('invoiceDisplay', function() {
  return {
    restrict: 'E',
    templateUrl: 'pages/invoiceDisplay.html', 
    scope: {
      cust: '=',
      tabHead: '=',
    },
    link: function(scope, elem, attrs) {
 
       scope.ok = function() {
         console.log(scope);
       };


       scope.clear = function(customer) {
         for (var i = 0; i < scope.cust.length; i++) {
           cust[i].selectedRow === false;
         }

       };

    }

  };
})