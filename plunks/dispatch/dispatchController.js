angular.module('dispatchModule', ['toastr'])
.controller('dispatchController', function(toastr,$scope,$http) {
  $scope.dispatch_fromdata="http://localhost:8080/inward/dispatchDisplayAll";
  $scope.dispatch_headers="Dispatch Date,Dispatch No, Inward No, Party, Component,Material,Qty/Kg,Qty/No,Rate/Kg,Rate/No,Total";
  $scope.dispatch_fields="creationDate,dispatchNo,inwardNo,party,component,material,qtyKgs,qtyNos,rateKg,rateNos,total";
  $scope.dispatch_button1="Invoice";



        updateDataGrid = function() {
            $http.get('http://localhost:8080/inward/dispatchDisplayAll')
                .success(function(datas) {
                    $scope.exportDataVariable = datas;

                }).error(function(datas){
                });
        };



      $scope.ok = function() {
        //console.log($scope.exportDataVariable);
        var selectedRec = $scope.report.selected;
          console.log(selectedRec);
          //if(checkIfCanBeInvoiced(selectedRec)){

          //var url = 'http://localhost:8080/tc/component/'+selectedRec.componentId;
          //$http.post(url,null)
          //    .success(function(data) {//delete if success
          //        toastr.success('Added TC');
          //        //$scope.exportDataVariable = data;
          //    }).error(function(data){
          //        toastr.error('Error in adding TC');
          //    });


              invoiceSelectedDispatches(selectedRec);
          //}
          //else{
              //toastr.error('Cannot invoice records from different inwards');
          //}
      };




        invoiceSelectedDispatches = function(record) {

            var invoiceRecord={};
            invoiceRecord.inwardNo=record.inwardNo;
            invoiceRecord.party=record.party;
            invoiceRecord.dispatchNo=record.dispatchNo;
            invoiceRecord.componentName=record.component;
            invoiceRecord.material=record.material;
            invoiceRecord.qtyKgs=record.qtyKgs;
            invoiceRecord.qtyNos=record.qtyNos;
            invoiceRecord.rateKg=record.rateKg;
            invoiceRecord.rateNos=record.rateNos;
            invoiceRecord.total=record.total;
            invoiceRecord.componentId=record.componentId;


            var url = 'http://localhost:8080/invoice/component/'+invoiceRecord.componentId;
                $http.post(url,invoiceRecord)
                    .success(function(data) {//delete if success

                        toastr.success('Invoice Generated Successfully');
                        updateDataGrid();
                        $scope.report.selected=[];
                    }).error(function(data){//dont if no success
                       // updateDataGrid();
                        toastr.error("Cannot Update : Error occured ");
                        updateDataGrid();
                        $scope.report.selected=[];
                    });
            //});
        };

      $scope.clear = function(selectedRecord) {
        $scope.report.selected=[]
      };
	}) 
.directive('dispatchDisplay', function() {
  return {
    restrict: 'E',
    templateUrl: 'pages/dispatchDisplay.html', 
    scope: {
      cust: '=',
      tabHead: '=',
    },
    link: function(scope, elem, attrs) {
 
      // scope.ok = function() { 
      //   console.log(scope.tcData); 
      // };


      // scope.clear = function(customer) {
      //   for (var i = 0; i < scope.cust.length; i++) {
      //     cust[i].selectedRow === false;
      //   }

      // };

    }

  };
})