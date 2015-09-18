var app = angular.module('StarterApp',
    ['chart.js', 'ngMaterial', 'ngRoute', 'ngMessages', 'mdPickers', 'pascalprecht.translate', 'ngCookies', 'timer', 'ngAnimate', 'vesparny.fancyModal', 'ezfb'


]).config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('blue');
}).config(function (ezfbProvider) {
    ezfbProvider.setInitParams({
        // This is my FB app id for plunker demo app
        appId: '1697499263818405',

        // Module default is `v2.0`.
        // If you want to use Facebook platform `v2.3`, you'll have to add the following parameter.
        // https://developers.facebook.com/docs/javascript/reference/FB.init
        version: 'v2.3'
    });
});




app.config(function ($mdIconProvider) {
    $mdIconProvider
      .iconSet("call", 'assets/svg/meter.svg', 24)
      .iconSet("social", 'assets/svg/clipboard.svg', 24);
});

app.config(['$routeProvider',

    function ($routeProvider) {

        $routeProvider.
    when('/balanceenquiry/', {
        templateUrl: 'views/balanceenquiry.html',
        controller: 'BalanceEnquiryCtrl'
    }).
       when('/transfer/', {
           templateUrl: 'views/transfer.html',
           controller: 'TransferCtrl'
       }).
             when('/profile/', {
                 templateUrl: 'views/profile.html',
                 controller: 'ProfileCtrl'
             }).

             when('/utility/', {
                 templateUrl: 'views/utility.html',
                 controller: 'UtilityCtrl'
             }).
               when('/candidate/', {
                   templateUrl: 'views/candidate.html',
                   controller: 'CandidateEnquiryCtrl'
               }).
             when('/detail/', {
                 templateUrl: 'views/partydetail.html',
                 controller: 'PartyDetailCtrl'
             }).
             when('/index/', {
                 templateUrl: 'views/index.html',
                 controller: 'IndexCtrl'
             }).
            when('/candidatedetail/', {
                templateUrl: 'views/candidatedetail.html',
                controller: 'CandidateDetailCtrl'
            }).
             when('/sealeg/', {
                 templateUrl: 'views/sealeg.html',
                 controller: 'SealEgCtrl'
             }).
        otherwise({
            redirectTo: '/index'
        });


    }



]);

app.run(function ($rootScope, $location,$window) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if ($window.sessionStorage.token == null) {
            $location.path('/index/');

            //$http.post('http://api.maepaysoh.org/token/generate', { api_key: "5a92c6572b6a841b35bcd0e855ee7ec00338fba4" }).
            //            then(function (response) {
            //                $window.sessionStorage.token = response.data.data.token;
            //            }, function (response) {

            //            });
        }
    });
});


app.controller('MenuCtrl', function ($scope, $location) {
    $scope.gohome = function () {

        $location.path("/index/");
    }
});



app.directive('data-loading', ['$http', function ($http) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                scope.isLoading = function () {
                    return $http.pendingRequests.length > 0;
                };

                scope.$watch(scope.isLoading, function (v) {
                    if (v) {
                        elm.show();
                    } else {
                        elm.hide();
                    }
                });
            }
        };

    }]);



app.directive('imageonload', function () {
    return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
           element.addClass('loading');
           
            element.bind('load', function() {
                //call the function that was passed
                element.removeClass('loading');
                
               // scope.$apply(attrs.imageonload);
            });
        }
    };
})





