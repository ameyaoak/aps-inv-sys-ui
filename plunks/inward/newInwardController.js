angular.module('newInwardModule', ['toastr' ])
.controller('newInwardController', function(toastr,$scope,$http) {

        var inwardEntry={};
        $http({
            method: 'GET',
            url: 'http://localhost:8080/party/all'
            //async: false
        }).success(function(data) {

            $scope.data = data;
           // $scope.partyNames=_.uniq(_.pluck(data,'partyName'));
            //var selectedParty = $scope.party.selectedOption;
            //       console.log(selectedParty);
            //$scope.componentNames=_.uniq(_.pluck(data,'componentName'));
            //console.log($scope.componentNames);
        });


            $scope.getComponentList = function(party) {
                $scope.selectedParty=party;
                $scope.componentRecords=party.components;
            };

        $scope.printIt = function(selection) {
            console.log(selection);
        };


        //$scope.getComponentDetails = function(selection) {
        //
        //    _.each($scope.components,function(record){
        //        if(_.isEqual(record.componentName,selection)){
        //
        //            $scope.selectedComponent=record;
        //
        //        }
        //    });
        //
        //    var component = $scope.selectedComponent;
        //    inwardEntry.party =component.partyName;
        //    inwardEntry.component =component.componentName;
        //    inwardEntry.material =component.componentMaterial;
        //    inwardEntry.partNo =component.componentPartNo;
        //    inwardEntry.process =component.componentProcess;
        //    inwardEntry.poNo =component.componentPoNo;
        //    inwardEntry.coreHd=component.coreHd;
        //    inwardEntry.surfaceHd=component.surfaceHd;
        //    inwardEntry.caseDepth=component.caseDepth;
        //    inwardEntry.crack=component.crack;
        //    inwardEntry.micro=component.micro;
        //    inwardEntry.distortation=component.distortation;
        //    inwardEntry.sf=component.sf;
        //    inwardEntry.wtt=component.wtt;
        //    inwardEntry.layerThickness=component.layerThickness;
        //    inwardEntry.apperance=component.apperance;
        //    inwardEntry.rateKg=component.rateKg;
        //    inwardEntry.rateNos=component.rateNos;
        //    inwardEntry.poDate=component.componentPoDate;
        //
        //
        //};

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

    })
.directive('newInwardForm', function() {
  return {
    restrict: 'E',
    templateUrl: 'inwardDisplay.html',
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