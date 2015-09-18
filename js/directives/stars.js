//http://g00glen00b.be/introduction-angularjs-directives/

app.directive("rating", function() {
    return {
        restrict: 'EA',
        template:
          '<div class="rating" layout="column" layout-align="center center">' +
                '<div layout="row" layout-align="center center">' +
                     '<a ng-class="starColor($index)" ng-repeat="star in stars" ng-click="setRating($index)" ng-mouseover="hover($index)" ng-mouseleave="stopHover()">' +
                 
                         ' <svg class="fa" ng-class="starClass(star, $index)" x="0px" y="0px"  viewBox="0 0 510 510"><g id="star"><polygon points="255,402.212 412.59,497.25 370.897,318.011 510,197.472 326.63,181.738 255,12.75 183.371,181.738 0,197.472 139.103,318.011 97.41,497.25 		" /> </g> </svg>' +
                     '</a>' +
               '</div>' +
             '<div ng-if="count != null" layout="row" layout-align="center center">' +
                  '<span class="ratinguser">ပေးပို့သူ : {{count}} ယောက်ရှိပါသည်..</span>' +
             '</div>'+
           '</div>',
        scope: {
            score: '=score',
            max: '=max',
            disable: '=disable',
            count: '=count',
        },
        link: function (scope, element, attributes) {
            scope.updateStars = function () {

               
                var idx = 0;
                scope.stars = [];
                for (idx = 0; idx < scope.max; idx += 1) {
                 
                    scope.stars.push({
                        full: scope.score > idx
                    });
                
                }
            };

            scope.starClass = function (star, idx) {
                var starClass = 'fa-star-o';
                if (star.full) {
                    starClass = 'fa-star';
                }
                return starClass;
            };

            scope.$watch('score', function (newValue, oldValue) {
                if (newValue !== null && newValue !== undefined) {
                    scope.updateStars();
                }
            });

            scope.setRating = function (idx) {
                scope.score = idx + 1;
            };

            scope.hover = function (idx) {
                scope.hoverIdx = idx;
            };

            scope.stopHover = function () {
                scope.hoverIdx = -1;
            };

            scope.starColor = function (idx) {
                var starClass = 'rating-normal';
                if (idx <= scope.hoverIdx) {
                    starClass = 'rating-highlight';
                }
                return starClass;
            };
        }
    };
});


