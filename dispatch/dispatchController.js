angular.module('dispatchModule', ['toastr'])
    .controller('dispatchController', function (toastr, $scope, $http) {
        $scope.dispatch_fromdata = "http://localhost:8080/inward/dispatchDisplayAll";
        $scope.dispatch_headers = "Dispatch Date,Dispatch No, Inward No, Party, Component,Material,Qty/Kg,Qty/No,Rate/Kg,Rate/No,Total";
        $scope.dispatch_fields = "creationDate,dispatchNo,inwardNo,party,component,material,qtyKgs,qtyNos,rateKg,rateNos,total";
        $scope.dispatch_button1 = "Invoice";


        updateDataGrid = function () {
            $http.get('http://localhost:8080/inward/dispatchDisplayAll')
                .success(function (datas) {
                    $scope.exportDataVariable = datas;
                }).error(function (datas) {
                });
        };


        $scope.ok = function () {
            //console.log($scope.exportDataVariable);
            var selectedRec = $scope.report.selected;
            if(selectedRec.inwardNo!=undefined) {
                invoiceSelectedDispatches(selectedRec);
                toastr.success('Invoice Generated Successfully');
            }
        };


        invoiceSelectedDispatches = function (record) {

            var invoiceRecord = {};
            invoiceRecord.inwardNo = record.inwardNo;
            invoiceRecord.party = record.party;
            invoiceRecord.dispatchNo = record.dispatchNo;
            invoiceRecord.componentName = record.component;
            invoiceRecord.material = record.material;
            invoiceRecord.qtyKgs = record.qtyKgs;
            invoiceRecord.qtyNos = record.qtyNos;
            invoiceRecord.rateKg = record.rateKg;
            invoiceRecord.rateNos = record.rateNos;
            invoiceRecord.total = record.total;
            invoiceRecord.componentId = record.componentId;


            var url = 'http://localhost:8080/invoice/component/' + invoiceRecord.componentId;
            $http.post(url, invoiceRecord)
                .success(function (data) {//delete if success
                    updateDataGrid();
                    $scope.report.selected = [];
                }).error(function (data) {//dont if no success
                    // updateDataGrid();
                    toastr.error("Cannot Update : Error occured ");
                    updateDataGrid();
                    $scope.report.selected = [];
                });
            //});
        };

        $scope.clear = function (selectedRecord) {
            $scope.report.selected = []
        };
    });