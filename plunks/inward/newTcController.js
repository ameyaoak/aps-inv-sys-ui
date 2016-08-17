angular.module('newTcModule', ['toastr' ])
    .controller('newTcController', function(toastr,$scope,$http,$routeParams) {

        $scope.tc_fromdata="http://localhost:8080/component/tcGrid/"+$routeParams.componentId;
        $scope.tc_headers="Particulars,Test Location,Test Method,Qty Checked, Specification, Observations, Remarks,Checked By";
        $scope.tc_fields="particular,testLocation,testMethod,qty,actuals,observations,remark,checkedBy";
        $scope.tc_button1="Invoice";

        console.log($routeParams.dispatchNo);
        console.log($routeParams.componentId);






        $scope.save = function() {

            //var tcObject = {};
            //
            //
            //tcObject.mm="";
            //tcObject.cut="";
            //tcObject.hv="";
            //tcObject.loadVal="";
            //
            //
            //
            //var url = 'http://localhost:8080/tc';
            //$http.post(url,tcObject)
            //    .success(function(data) {//delete if success
            //        toastr.success('Added TC');
            //        $scope.tcNo=data.tcNo;
            //    }).error(function(data){
            //        toastr.error('Error in adding TC');
            //    });



            var gridRows=[];
            var gridRow={};
            var tcObject = {};


            tcObject.mm=$scope.tc.mm;
            tcObject.cut=$scope.tc.cut;
            tcObject.hv=$scope.tc.hv;
            tcObject.loadVal=$scope.tc.load;

            _.each($scope.exportDataVariable, function(tcGridRow){

                //gridRow.tcNo=$scope.tcNo;
                gridRow.actuals=tcGridRow.actuals;
                gridRow.observation=tcGridRow.observation;
                gridRow.particular=tcGridRow.particular;
                gridRow.testLocation=tcGridRow.testLocation;
                gridRow.testMethod=tcGridRow.testMethod;
                gridRow.qty=tcGridRow.qty;
                gridRow.remark=tcGridRow.remark;
                gridRow.checkedBy=tcGridRow.checkedBy;
                gridRows.push(gridRow);
            });



            tcObject.gridRows=gridRows;
            //tcObject.tcNo=$scope.tcNo;


             saveTCGrid(tcObject);


          //  $scope.exportDataVariable={};
        };



         saveTCGrid = function(tcRow) {
            var url = 'http://localhost:8080/tc';
            $http.post(url,tcRow)
                .success(function(data) {//delete if success
                    toastr.success('Added TC');
                    //$scope.exportDataVariable = data;
                }).error(function(data){
                    toastr.error('Error in adding TC');
                });
        };

    })
    .directive('newTcForm', function() {
        return {
            restrict: 'E',
            templateUrl: 'newTcForm.html',
            scope: {
                cust: '=',
                tabHead: '=',
            },
            link: function(scope, elem, attrs) {

                //scope.ok = function() {
                //  console.log(scope.report.selected);
                //};


                // scope.clear = function(customer) {
                //   for (var i = 0; i < scope.cust.length; i++) {
                //     cust[i].selectedRow === false;
                //   }

                // };

            }

        };
    })