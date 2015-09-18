


app.controller('BalanceEnquiryCtrl', function ($scope, $http, $mdDialog, $window, $location, $mdBottomSheet, $mdToast,$q) {
    $scope.partydownloading = false;
    
 
            if ($window.sessionStorage.parties == null) {
                $http.get('http://api.maepaysoh.org/party?token=' + $window.sessionStorage.token + "&per_page=500").
            then(function (response2) {
                var p = response2.data.data;
                var t = [];
                for (i = 0; i < p.length; i++) {
                    t.push({ id: p[i].id, party_flag: p[i].party_flag, party_name: p[i].party_name, region: p[i].region, headquarters: p[i].headquarters });
                }

                $window.sessionStorage.parties = JSON.stringify(t);
               
                $scope.parties = t;
                
            });
            }
            else {

              
                $scope.parties = JSON.parse($window.sessionStorage.parties);
            }
  


    

    $scope.imagePath = "";


    var selectedparty = {};

    $scope.showAdvanced = function (ev, item) {
       
        $window.sessionStorage.currentparty = JSON.stringify(item);
        $location.path('/detail/');
  
    };
 




   


  
});

