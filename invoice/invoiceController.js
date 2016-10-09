angular.module('invoiceModule', ['chartModule' ])
    .controller('invoiceController', function($scope,$http,$location) {
        $scope.invoice_fromdata="http://localhost:8080/invoice/all";
        $scope.invoice_headers="Creation Date,Invoice No,Dispatch Id, Inward No, Party, Component,Material,Qty/Kg,Qty/No,Rate/Kg,Rate/No,Total";
        $scope.invoice_fields="creationDate,invoiceNo,dispatchNo,inwardNo,party,componentName,material,qtyKgs,qtyNos,rateKg,rateNos,total";
        $scope.invoice_button1="Add TC";

        $scope.tcForRec = function() {
            var selectedRec = $scope.report.selected;
            $scope.selectedRecForTc = selectedRec;
            if(selectedRec.testCertificate!=undefined){
               $location.path('/newtc').search({tcNo: selectedRec.testCertificate.tcNo});
            }


        };

        $scope.report = function() {
            var selectedRec = $scope.report.selected;
            $scope.selectedRecForTc = selectedRec;
            if(selectedRec.inwardNo!=undefined) {
               $location.path('/inv').search({dispatchNo: selectedRec.dispatchNo,inwardNo: selectedRec.inwardNo});
            }
        };

        $scope.clear = function (selectedRecord) {
            $scope.report.selected = []
        };


    });