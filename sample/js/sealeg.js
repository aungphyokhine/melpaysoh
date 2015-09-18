app.controller('SealEgCtrl', function ($scope, $http, $rootScope, $fancyModal) {
    var favtype = 'SEALTEST';
    var poblist = [
    {d:[{ x: 217, y: 366, deg: -45 }], valid: false, desc: 'this is valid..'},
    { d: [{ x: 217, y: 288, deg: 0 }], valid: false, desc: 'this is valid..' },
    { d: [{ x: 197, y: 172, deg: 0 }], valid: false, desc: 'this is valid..' },
    
    { d: [{ x: 59, y: 404, deg: 0 }, { x: 217, y: 404, deg: 0 }], valid: false, desc: 'this is valid..' },

    { d: [], valid: true, desc: 'this is valid..' },
    { d: [{ x: 217, y: 250, deg: 0 }], valid: false,dirty:true, desc: 'this is valid..' },
    { d: [{ x: 217, y: 325, deg: 0 }], valid: false, mark: true, desc: 'this is valid..' },
    { d: [{ x: 217, y: 325, deg: 0 }], valid: false, nosign:true, desc: 'this is valid..' },



    { d: [{ x: 197, y: 172, deg: 0 }], valid: true, desc: 'this is valid..' },
    { d: [{ x: 197, y: 172, deg: 0 }], valid: true, desc: 'this is valid..' },
    ];

    $scope.page = 0;
    setpos();
    function setpos() {
        $scope.item = poblist[$scope.page];
      
    }

    $scope.next = function () {
        if ($scope.page < poblist.length) {
            $scope.page++;
            setpos();
        }
    }

    $scope.prev = function () {
        if ($scope.page > 0) {
            $scope.page--;
            setpos();
        }
    }


});