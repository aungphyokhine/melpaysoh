//http://g00glen00b.be/introduction-angularjs-directives/

app.directive("sealform", function () {
    return {
        restrict: 'EA',
        template:
          '<div class="sealform">' +
          ' <md-icon class="sign" ng-if="!data.nosign" md-svg-icon="svg/melsign.svg"></md-icon>' +
                ' <md-icon ng-repeat="item in data.d" class="seal" style="-moz-transform:rotate({{item.deg}}deg); -webkit-transform:rotate({{item.deg}}deg); -o-transform:rotate({{item.deg}}deg); -ms-transform:rotate({{item.deg}}deg);' +
                ' margin-left:{{item.x}};margin-top:{{item.y}} " aria-label="Menu" md-svg-icon="svg/melseal.svg"></md-icon>' +
                ' <md-icon class="form" aria-label="Menu" md-svg-icon="svg/melform.svg"></md-icon>' +
                ' <md-icon  ng-if="data.mark" class="mark" aria-label="Menu" md-svg-icon="svg/ic_rate_review_black_24px.svg"></md-icon>' +
                
           '</div>',
        scope: {
           data: '=data',
        },
        link: function (scope, element, attributes) {
          
        }
    };
});


