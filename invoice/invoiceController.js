angular.module('invoiceModule', ['chartModule' ])
    .controller('invoiceController', function($scope,$http,$location) {
        $scope.invoice_fromdata="http://localhost:8080/invoice/all";
        $scope.invoice_headers="Creation Date,Invoice No,Dispatch Id, Inward No, Party, Component,Material,Qty/Kg,Qty/No,Rate/Kg,Rate/No,Total";
        $scope.invoice_fields="creationDate,invoiceNo,dispatchNo,inwardNo,party,componentName,material,qtyKgs,qtyNos,rateKg,rateNos,total";
        $scope.invoice_button1="Add TC";

        $scope.tcForRec = function() {
            var selectedRec = $scope.report.selected;
            console.log(selectedRec);

            $scope.selectedRecForTc = selectedRec;
            console.log( $location.path('/newtc').search({tcNo: selectedRec.testCertificate.tcNo}));


        }

        $scope.report = function() {
            var selectedRec = $scope.report.selected;
            console.log(selectedRec.inwardNo);

            $scope.selectedRecForTc = selectedRec;
            console.log( $location.path('/inv').search({invoiceNo: selectedRec.invoiceNo}));


        }



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