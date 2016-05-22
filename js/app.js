(function () {
  'use strict';

  angular.module('app', [])
    .directive('itemsGrid', function ($window) {
      return {
        restrict: 'E',
        bindToController: true, // no need for scope, used for demonstration only
        controller: ItemsGridController, // no controller needed just wanted some data
        link: link
      };

      function link(scope, el) {

        // possible (and probably better) to refactor into ng-click and use controller instead.
        // however recommend using a switch statement instead of getComputedStyle
        el.on('click', handleClick);

        function handleClick(event) {

          var index = angular.element(event.target).data('index');
          var item = scope.items[index]; // reference to items collection

          if (index || index === 0) {

            // getComputedStyle IE11 and above (based on media queries)
            // use switch statement and $window object for IE10 and below
            var columnWidth = +$window.getComputedStyle(el[0], '::before')
              .getPropertyValue('content')
              .replace(/"/g, '')
              .split('-')[1];

            var column = index % columnWidth + 1;
            var row = Math.floor(index / columnWidth) + 1;
            var buildItem = {
              id: item.id,
              name: item.name,
              column: column,
              row: row
            };

            // just for display purposes
            scope.$apply(function () {
              scope.selectedItem = buildItem
            });

            console.log(buildItem);
          }
        }
      }

      function ItemsGridController($scope) {
        $scope.items = [
          {
            id: 1,
            name: 'Pear'
          },
          {
            id: 2,
            name: 'Banana'
          },
          {
            id: 3,
            name: 'Pear'
          },
          {
            id: 4,
            name: 'Plum'
          },
          {
            id: 5,
            name: 'Pear'
          },
          {
            id: 6,
            name: 'Banana'
          },
          {
            id: 7,
            name: 'Pear'
          },
          {
            id: 8,
            name: 'Plum'
          }
        ];
      }
    })
})
();