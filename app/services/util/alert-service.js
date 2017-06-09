(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('AlertFactory', AlertFactory);

    AlertFactory.$inject = ['$mdToast', '$mdDialog'];

    function AlertFactory($mdToast, $mdDialog) {
        
        var app = {};

        var toastPosition = angular.extend({}, last);

        var last = {
            bottom: false,
            top: true,
            left: false,
            right: true
        };

        app.showConfirm = showConfirm;
        app.showAlert = showAlert;

        function showAlert(message) {
            var position = getToastPosition();

            $mdToast.show(
              $mdToast.simple()
                .textContent(message)
                .position(position)
                .hideDelay(3000)
            );
        }

        function showConfirm(ev, alert) {
            var confirm = $mdDialog.confirm()
                  .title(alert.title)
                  .textContent(alert.message)
                  .targetEvent(ev)
                  .ok('Confirmar')
                  .cancel('Cancelar');

            return $mdDialog.show(confirm);
        };

        function getToastPosition() {
            sanitizePosition();

            return Object.keys(toastPosition)
              .filter((pos) => { return toastPosition[pos]; })
              .join(' ');
        };

        function sanitizePosition() {
            var current = toastPosition;

            current.top = true;
            current.right = true;

            last = angular.extend({}, current);
        }

        return app;
    }
})();
