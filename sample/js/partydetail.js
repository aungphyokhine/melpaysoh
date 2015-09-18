


app.controller('PartyDetailCtrl', function ($scope, $window, $location, $http, $fancyModal,$rootScope) {
   
    var item = JSON.parse($window.sessionStorage.currentparty);
    var favtype = 'P' + item.id + 'SR';

    $http.get('http://api.maepaysoh.org/party/' + item.id + '?token=' + $window.sessionStorage.token).
           then(function (response2) {
               $scope.item = response2.data.data;
             
           });

    ///fectching rate data....
    $http.get('http://aungphyokhine.esy.es/selectfav.php?type=' + favtype).
         then(function (data) {
        
             $scope.usercount = data.data[0].count;
             $scope.rate = data.data[0].sum / data.data[0].count;
         });

    $scope.getcandidate = function() {

        $window.sessionStorage.partyid = $scope.item.id;
        $location.path('/candidate/');
    }



    $scope.payrate = function (ev) {

        $rootScope.share = { type: favtype, picture: $scope.item.party_flag, link: 'http://plnkr.co/edit/qclqht?p=preview', subject: $scope.item.party_name };

        var popup = $fancyModal.open({
            templateUrl: 'template/detailparty.html?d',
            closeByEscape: false,
            controller: 'ratemodelCtrl as ctrl',
        });
        //popup.opened.then(function () {
        //    popup.close();
        //});

        $rootScope.$on("ratesuccess", function (ev, data) {
            $scope.usercount = data.data[0].count;
            $scope.rate = data.data[0].sum / data.data[0].count;
           // alert(JSON.stringify(args))
        });
        $rootScope.$on("sharesuccess", function () { popup.close(); });
        $rootScope.$on("ratefail", function () { popup.close(); });
        $rootScope.$on("loginfail", function () { popup.close(); });
    };
   

});

