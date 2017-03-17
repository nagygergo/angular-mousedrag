/**!
 * AngularJS mouse drag directive
 * @author  Ozan Tunca  <ozan@ozantunca.org>
 * @version 0.1.0
 */
(function() {

  var ngMousedrag = angular.module('ngMouseDrag', []);
  ngMousedrag.directive('ngMousedrag', ['$document', function ngMousedrag($document) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        var endTypes = 'touchend mouseup',
          moveTypes = 'touchmove mousemove',
          startTypes = 'touchstart mousedown',
          startX, startY, endX, endY;

        element.bind(startTypes, function startDrag(e) {
          e.preventDefault();
          startX = e.pageX;
          startY = e.pageY;
          e.startX = startX;
          e.startY = startY;
          e.type = 'start';
          scope.$event = e;
          scope.$eval(attrs.ngMousedrag);

          $document.bind(moveTypes, function(e) {
            e.dragX = e.pageX - startX;
            e.dragY = e.pageY - startY;
            e.startX = startX;
            e.startY = startY;
            endX = e.dragX;
            endY = e.dragY;
            e.type = 'move';
            scope.$event = e;
            scope.$eval(attrs.ngMousedrag);
          });

          $document.bind(endTypes, function() {
            $document.unbind(moveTypes);
            var e = {};
            e.startX = startX;
            e.startY = startY;
            e.endX = endX;
            e.endY = endY;
            e.type = 'end';
            scope.$event = e;
            scope.$eval(attrs.ngMousedrag);
          });
        });
      }
    };
  }]);

})();
