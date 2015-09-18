


app.controller('IndexCtrl', function ($scope, $window, $location, $http, $interval, $fancyModal, $rootScope) {
    $scope.toparty = function () {
        $interval.cancel(stopTime);

        $http.get('http://aungphyokhine.esy.es/insertfav.php?user=u203&rank=2&type=10').then(function (response2) {
           // alert(JSON.stringify(response2));
    });

        $location.path('/balanceenquiry/');
    };

    $http.post('http://api.maepaysoh.org/token/generate', { api_key: "5a92c6572b6a841b35bcd0e855ee7ec00338fba4" }).
                then(function (response) {
                    $window.sessionStorage.token = response.data.data.token;
                }, function (response) {

                });

    //$http.post('http://checkvoterlist.uecmyanmar.org/api/', { voter_name: 'aung phyo khine', nrcno: '12/pazata(n)030076' }).
    ////$http.get('http://checkvoterlist.uecmyanmar.org/api/').
    //then(function (response2) {
    //    alert(JSON.stringify(response2));
    //});

    $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = [300, 500, 100];


    

  
    $scope.time = '';
   
    var updateTime = function () {
        var date1 = new Date();
        var date2 = new Date("8/Nov/2015 9:00:00");

        var diff = date2.getTime() - date1.getTime();

        var days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * (1000 * 60 * 60 * 24);

        var hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);

        var mins = Math.floor(diff / (1000 * 60));
        diff -= mins * (1000 * 60);

        var seconds = Math.floor(diff / (1000));
        diff -= seconds * (1000);

        date1 = null;
        date2 = null;
        $scope.time = engtomyanmar(days) + "ရက် " + engtomyanmar(hours) + "နာရီ " + engtomyanmar(mins) + "မိနစ် " + engtomyanmar(seconds) + "စက္ကန့်";
       // alert($scope.time);

       
    }
    updateTime();
    stopTime = $interval(updateTime, 1000);
    //  $timeout(countUp, 500);$interval.cancel(stopTime);


    function engtomyanmar(s) {
        var t = '၀၁၂၃၄၅၆၇၈၉'.split('');
        var sa = (s+'').split('');
        var ta = '';
        for (i = 0; i < sa.length; i++) {
            ta+= t[sa[i]*1];

        }

        return ta;
    }

  

   

    $rootScope.pageHref = "http://aungphyokhine.esy.es/maepaysoh/";
    
});


