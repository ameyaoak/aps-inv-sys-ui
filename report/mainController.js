 angular.module('mainModule', ['toastr' ])
    .controller('mainController', function(toastr,$scope,$http,$routeParams) {

        var url = "http://localhost:8080/invoice/"+$routeParams.invoiceNo;
              $http.get(url)
                 .success(function (data) {//delete if success
                     $scope.inv = data;
                     $scope.inv.testCertificate.mm = JSON.parse("[" + data.testCertificate.mm + "]");
                     $scope.inv.testCertificate.hv = JSON.parse("[" + data.testCertificate.hv + "]");
                     $scope.inv.testCertificate.cut = JSON.parse("[" + data.testCertificate.cut + "]");
                     $scope.numberToWords($scope.inv.total);
                     $scope.chartConfig = initChartConfig(data.testCertificate);
                 }).error(function (data) {
                     // toastr.error('Error in getting TC');
                 });

         $scope.image = null;
         $scope.imageFileName = '';


        $scope.numberToWords = function(number) {

            var iWords = ['Zero', ' One', ' Two', ' Three', ' Four', ' Five', ' Six', ' Seven', ' Eight', ' Nine'];
            var ePlace = ['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];
            var tensPlace = ['', ' Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety'];
            var inWords = [];

            var numReversed, inWords, actnumber, i, j;

            function tensComplication() {
                'use strict';
                if (actnumber[i] === 0) {
                    inWords[j] = '';
                } else if (actnumber[i] === 1) {
                    inWords[j] = ePlace[actnumber[i - 1]];
                } else {
                    inWords[j] = tensPlace[actnumber[i]];
                }
            }

            function testSkill() {
                'use strict';
                var junkVal = number;
                junkVal = Math.floor(junkVal);
                var obStr = junkVal.toString();
                numReversed = obStr.split('');
                actnumber = numReversed.reverse();

                if (Number(junkVal) >= 0) {
                    //do nothing
                } else {
                    window.alert('wrong Number cannot be converted');
                    return false;
                }
                if (Number(junkVal) === 0) {
                    document.getElementById('container').innerHTML = obStr + '' + 'Rupees Zero Only';
                    return false;
                }
                if (actnumber.length > 9) {
                    window.alert('Oops!!!! the Number is too big to covertes');
                    return false;
                }


                var iWordsLength = numReversed.length;
                var finalWord = '';
                j = 0;
                for (i = 0; i < iWordsLength; i++) {
                    switch (i) {
                        case 0:
                            if (actnumber[i] === '0' || actnumber[i + 1] === '1') {
                                inWords[j] = '';
                            } else {
                                inWords[j] = iWords[actnumber[i]];
                            }
                            inWords[j] = inWords[j] + ' Only';
                            break;
                        case 1:
                            tensComplication();
                            break;
                        case 2:
                            if (actnumber[i] === '0') {
                                inWords[j] = '';
                            } else if (actnumber[i - 1] !== '0' && actnumber[i - 2] !== '0') {
                                inWords[j] = iWords[actnumber[i]] + ' Hundred and';
                            } else {
                                inWords[j] = iWords[actnumber[i]] + ' Hundred';
                            }
                            break;
                        case 3:
                            if (actnumber[i] === '0' || actnumber[i + 1] === '1') {
                                inWords[j] = '';
                            } else {
                                inWords[j] = iWords[actnumber[i]];
                            }
                            if (actnumber[i + 1] !== '0' || actnumber[i] > '0') {
                                inWords[j] = inWords[j] + ' Thousand';
                            }
                            break;
                        case 4:
                            tensComplication();
                            break;
                        case 5:
                            if (actnumber[i] === '0' || actnumber[i + 1] === '1') {
                                inWords[j] = '';
                            } else {
                                inWords[j] = iWords[actnumber[i]];
                            }
                            if (actnumber[i + 1] !== '0' || actnumber[i] > '0') {
                                inWords[j] = inWords[j] + ' Lakh';
                            }
                            break;
                        case 6:
                            tensComplication();
                            break;
                        case 7:
                            if (actnumber[i] === '0' || actnumber[i + 1] === '1') {
                                inWords[j] = '';
                            } else {
                                inWords[j] = iWords[actnumber[i]];
                            }
                            inWords[j] = inWords[j] + ' Crore';
                            break;
                        case 8:
                            tensComplication();
                            break;
                        default:
                            break;
                    }
                    j++;
                }


                inWords.reverse();
                for (i = 0; i < inWords.length; i++) {
                    finalWord += inWords[i];
                }
               $scope.inv.inWords=finalWord;
            }
        };

         //$scope.chartConfig = initChartConfig($scope.inv);

        //$scope.save = function() {
        //    var tcObject = $scope.tc;
        //
        //    var url = 'http://localhost:8080/tc';
        //    $http.put(url,tcObject)
        //        .success(function(data) {//delete if success
        //            toastr.success('Updated TC');
        //            //$scope.exportDataVariable = data;
        //        }).error(function(data){
        //            toastr.error('Error in updating TC');
        //        });
        //};


         //$scope.name = 'World';
         //$http.get('data.json')
         //    .success(function(data) {
         //        $scope.inv = data;
         //        $scope.chartConfig = initChartConfig(data);
         //    })
         //    .error(function (data, status, headers, config) {
         //        alert("error reading json");
         //    });



     });
     //
     //.controller('MainCtrl', function($scope,$http) {
     //    $scope.name = 'World';
     //    $http.get('data.json')
     //        .success(function(data) {
     //            $scope.inv = data;
     //            $scope.chartConfig = initChartConfig(data);
     //        })
     //        .error(function (data, status, headers, config) {
     //            alert("error reading json");
     //        });
     //}).controller('ImageCtrl', function($scope) {
     //    $scope.image = null
     //    $scope.imageFileName = ''
     //})

