app.controller('ratemodelCtrl', function ($scope, $location, $http, $rootScope, ezfb, $fancyModal, $q) {

    $scope.rate = 0;
    $scope.share = $rootScope.share;
    $scope.connectfb = false;

    //$scope.$watch(function (scope) { return scope.rate },
    //          function () {
    //              if ($scope.rate == 0) {
    //                  $scope.description = 'နှစ်သက်မှုပမာဏ အလိုက် ကြယ်ပွင့်များကို ရွေးချယ်ပေးရန်ဖြစ်ပါသည်။';
    //              } else if ($scope.rate == 1) {
    //                  $scope.description = $scope.share.description + '  ကို ရွေးချယ် ရန်ခက်ပါသည်။';
    //              }
    //              else if ($scope.rate == 2) {
    //                  $scope.description = $scope.share.description + ' ကို ရွေးချယ် ရန်ဖြစ်နိုင်ပါသည်။';
    //              }
    //              else if ($scope.rate == 3) {
    //                  $scope.description = $scope.share.description + ' ကို ရွေးချယ် ရန်ရှိပါသည်။';
    //              }
    //              else if ($scope.rate == 4) {
    //                  $scope.description = $scope.share.description + ' ကို ရွေးချယ် ရန်များပါသည်။';
    //              }
    //              else {
    //                  $scope.description = $scope.share.description + '  ကို ရွေးချယ်ရန် ကျိန်းသေ ပါသည်။';
    //              }

    //          }
    //         );

    $scope.username = '';
    $scope.getUserInfo = function () {
        $scope.connectfb = true;
        ezfb.getLoginStatus(function (res) {


            updateApiMe();
         
            $scope.connectfb = false;

            if (res.status != 'connected') {
                var t = fblogin();
                t.then(function (response) {
                  
                    updateApiMe();
                    //now logged in
                    var setrate = insertrate('', response);
                    setrate.then(function (response) {
                        //now rated
                        $rootScope.$broadcast("ratesuccess",response);

                        $scope.rate = response.data[0].sum / response.data[0].count;

                        var share = fbshare();
                        share.then(function () {
                            //now shared
                            $rootScope.$broadcast("sharesuccess");
                        });

                    }, function (reason) {
                        alert('Failed: rate');
                        $rootScope.$broadcast("ratefail");
                    });

                }, function (reason) {
                    alert('Failed: login');
                    $rootScope.$broadcast("loginfail");
                });

            }
            else {
             
                var setrate = insertrate(res.authResponse.userID);
                setrate.then(function (response) {
                    //now rated
                    $rootScope.$broadcast("ratesuccess", response);
                  //  $scope.rate = response.data[0].sum / response.data[0].count;

                    var share = fbshare();
                    share.then(function () {
                        //now shared
                        $rootScope.$broadcast("sharesuccess");
                    });

                }, function (reason) {
                    alert('Failed: rate');
                    $rootScope.$broadcast("ratefail");
                });

            }

            // $scope.loginStatus = res;
            //(more || angular.noop)();




        });

        /**
         * Origin: FB.api
         */
        //ezfb.api('/me', function (res) {
        //    $scope.apiMe = res;
        //});

    }

    function insertrate(userid) {
       
        var deferred = $q.defer();
        $scope.loginStatus = userid;
        $http.post('http://aungphyokhine.esy.es/insertfav.php?user=' + userid + '&rank=' + $scope.rate + '&type=' + $scope.share.type).
       then(function (res) {
           deferred.resolve(res);


       }, function (res) {
           deferred.reject(res);
       });
        return deferred.promise;
    }


    function fblogin() {
        var deferred = $q.defer();
        ezfb.login(function (res) {
            if (res.authResponse) {
                updateLoginStatus(updateApiMe);

                deferred.resolve(res);
            }
            else {
                deferred.reject();
            }

        }, { scope: 'email,user_likes' });
        return deferred.promise;
    }




    function fbshare() {
        var deferred = $q.defer(); 
        ezfb.ui(
          {
              method: 'feed',
              name: $scope.apiMe.name + ' gives ' + $scope.rate + ' stars for ' + $scope.share.subject,
              picture: $scope.share.picture,
              link: $scope.share.link,
              description: $scope.description
          },
          function (res) {
              deferred.resolve();
          }
        );
        return deferred.promise;
    }



    function login() {
        /**
         * Calling FB.login with required permissions specified
         * https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
         */
        ezfb.login(function (res) {
            /**
             * no manual $scope.$apply, I got that handled
             */
            if (res.authResponse) {
                updateLoginStatus(updateApiMe);
            }
        }, { scope: 'email,user_likes' });
    };

    $scope.logout = function () {
        /**
         * Calling FB.logout
         * https://developers.facebook.com/docs/reference/javascript/FB.logout
         */
        ezfb.logout(function () {
            updateLoginStatus(updateApiMe);
        });
    };

    function share() {
        ezfb.ui(
          {
              method: 'feed',
              name: 'angular-easyfb API demo',
              picture: 'http://plnkr.co/img/plunker.png',
              link: 'http://plnkr.co/edit/qclqht?p=preview',
              description: 'angular-easyfb is an AngularJS module wrapping Facebook SDK.' +
                           ' Facebook integration in AngularJS made easy!' +
                           ' Please try it and feel free to give feedbacks.'
          },
          function (res) {
              // res: FB.ui response
          }
        );
    };

    /**
     * For generating better looking JSON results
     */
    var autoToJSON = ['loginStatus', 'apiMe'];
    angular.forEach(autoToJSON, function (varName) {
        $scope.$watch(varName, function (val) {
            $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
        }, true);
    });

    /**
     * Update loginStatus result
     */
    function updateLoginStatus(more) {
        ezfb.getLoginStatus(function (res) {
            $scope.loginStatus = res;

            (more || angular.noop)();
        });
    }

    /**
     * Update api('/me') result
     */
    function updateApiMe() {
        ezfb.api('/me', function (res) {
            $scope.apiMe = res;
        });
    }
});