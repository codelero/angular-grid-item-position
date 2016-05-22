(function () {
  'use strict';

  angular.module('app', [])
    .directive('itemsGrid', function () {
      return {
        restrict: 'E',
        controller: ItemsGridController // no controller needed just wanted some data
      };

      function ItemsGridController($scope, $window) {

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

        $scope.reportItem = reportItem;

        // better off in a factory
        function reportItem(event) {
          var index = angular.element(event.target).data('index');

          if (index || index === 0) {
            var columnWidth = _getColumnWidth(),
              item = $scope.items[index],
              column = index % columnWidth + 1,
              row = Math.floor(index / columnWidth) + 1;

            var buildItem = {
              id: item.id,
              name: item.name,
              column: column,
              row: row
            };

            $scope.selectedItem = buildItem;

            console.log(buildItem);
          }
        }

        function _getColumnWidth() {
          var windowWidth = $window.innerWidth;

          switch (true) {
            case (windowWidth > 1200):
              return 6;
            case (windowWidth > 1000):
              return 5;
            case (windowWidth > 800):
              return 4;
              break;
            case (windowWidth > 500):
              return 3;
            default :
              return 1;
          }

        }
      }
    })
})
();