


app.controller('CandidateEnquiryCtrl', function ($scope, $timeout, $q, $log, $http, $mdDialog, $window,$location) {
    $scope.partydownloading = false;
   
    var partyid = $window.sessionStorage.partyid;
    $scope.currentdiv = { properties: { DT_PCODE: null, DT: 'နေရာဒေသအားလုံး..' } };
    $scope.pageid = 1;
    getcandidate($scope.pageid);


    function getcandidate(pageid){
        var dtfilter = "";
        if ($scope.currentdiv.properties.DT_PCODE != null) {
            dtfilter = "&constituency_dt_pcode=" + $scope.currentdiv.properties.DT_PCODE;
        }
        
          
          $http.get('http://api.maepaysoh.org/candidate/list?token=' + $window.sessionStorage.token + "&party=" + partyid + "&page=" + pageid + dtfilter).
      then(function (response2) {
          var c = [];

          for (i = 0; i < response2.data.data.length; i++) {
              c.push({ photo_url: response2.data.data[i].photo_url, id: response2.data.data[i].id, name: response2.data.data[i].name, legislature: response2.data.data[i].legislature, constituency: { name: response2.data.data[i].constituency.name } });
          }


          $scope.candidates = c;
          $scope.meta = response2.data.meta;
          $scope.pageid = $scope.meta.pagination.current_page;
          $scope.pagination = $scope.meta.pagination;
          $scope.partydownloading = false;


          $scope.showprev = $scope.meta.pagination.current_page > 1;
          $scope.shownext = $scope.meta.pagination.current_page < $scope.meta.pagination.total_pages;

      });
      
         // if ($window.sessionStorage.geodata == null) {
          
         // }
              

     
        

    }

    $scope.onSwipeLeft = function (ev) {
        var idx = $scope.pageid + 1;
        var totalpage = $scope.meta.pagination.total_pages;
        if (idx <= totalpage) {
            getcandidate(idx);
        }
        else {
            alert('No more page.');
        }

    };
    $scope.onSwipeRight = function (ev) {
       
       
        var idx = $scope.pageid - 1;

        if (idx >= 1) {
            getcandidate(idx);
        }
        else {
            alert('No more page.');
        }

    };




    $scope.imagePath = "";


    var selectedparty = {};

    $scope.showAdvanced = function (ev, item) {

    };
   

    $scope.showdetail = function (item) {
        $window.sessionStorage.currentcandidate = JSON.stringify(item);
        $location.path('/candidatedetail/');
    };




    $scope.changedivision  = function() {
    getcandidate(1);
}

    
    $scope.preload = true;
    
    $scope.loadDivisions = function () {
        if ($scope.preload) {
            if ($window.sessionStorage.divisions == null) {
                return $http.get('http://api.maepaysoh.org/geo/district?token=' + $window.sessionStorage.token + "&no_geo=true&per_page=150").
    then(function (geodata) {
        var d = [];

        for (i = 0; i < geodata.data.data.length; i++) {
            d.push({ properties: { DT_PCODE: geodata.data.data[i].properties.DT_PCODE, DT: geodata.data.data[i].properties.DT } });
        }

        $scope.divisions = d;
        $scope.divisions.push({ properties: { DT_PCODE: null, DT: 'နေရာဒေသအားလုံး..' } });
        $window.sessionStorage.divisions = JSON.stringify($scope.divisions);
    });
            }
            else {
                $scope.divisions = JSON.parse($window.sessionStorage.divisions);
            }
            $scope.preload = false;
        }
       
        
    }
   




    $scope.showConfirm = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'template/confirm-dialogue.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true
        })
    .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
        $scope.status = 'You cancelled the dialog.';
    });
  
    };


});


function DialogController($scope, $mdDialog, $http, $window) {

    $scope.loadDivisions = function () {


        return $http.get('http://api.maepaysoh.org/geo/district?token=' + $window.sessionStorage.token + "&no_geo=true&per_page=150").
then(function (geodata) {
    $scope.divisions = geodata.data.data;
    $scope.divisions.push({ properties: { DT_PCODE: null, DT: 'နေရာဒေသအားလုံး..' } });

});


    };


    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
    $scope.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}



app.controller('CandidateDetailCtrl', function ($scope, $timeout, $q, $log, $http, $mdDialog, $window, $location, $rootScope, $fancyModal) {
    var item = JSON.parse($window.sessionStorage.currentcandidate); 
    $http.get('http://api.maepaysoh.org/candidate/' + item.id + '?token=' + $window.sessionStorage.token).
     then(function (response2) {
         $scope.item = response2.data;

     });


    var favtype = 'C' + item.id + 'SR';
    ///fectching rate data....
    $http.get('http://aungphyokhine.esy.es/selectfav.php?type=' + favtype).
         then(function (data) {

             $scope.usercount = data.data[0].count;
             $scope.rate = data.data[0].sum / data.data[0].count;
         });


    $scope.payrate = function (ev) {

        $rootScope.share = { type: favtype, picture: $scope.item.photo_url, link: 'http://plnkr.co/edit/qclqht?p=preview', subject:  $scope.item.name };

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

angular.module('selectDemoOptionsAsync', ['ngMaterial'])
.controller('SelectAsyncController', function ($timeout, $scope) {
   
});