(function () {
    'use strict';
    angular.module('myApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$filter', '$scope', 'AlertFactory'];

    function HomeController($filter, $scope, AlertFactory) {
        var vm = this;
        var id = 1;
        
        vm.total = 0;
        vm.entry = {
            type: 1
        };

        vm.query = {
            order: 'type',
            limit: 5,
            page: 1
        };

        vm.propertyName = 'type';
        vm.entries = [];

        vm.add = add;
        vm.remove = remove;
        vm.showConfirm = showConfirm;

        activate();

        function activate() {
            getTotal();
        }

        function getTotal() {
            vm.total = 0;

            vm.entries.forEach((entry, index) => {
                if (entry.type === 1) {
                    vm.total += entry.value;
                } else {
                    vm.total -= entry.value;
                }
            });
        }

        function add() {
            if (entryIsValid()) {
                var date = new Date();
                var typeName = vm.entry.type === 1 ? 'Depósito' : 'Saque';

                vm.entry.date = date;
                vm.entry.id = id;

                vm.entries.push(vm.entry);
                vm.entry = {
                    type: 1,
                };

                getTotal();

                AlertFactory.showAlert(typeName + ' adicionado com sucesso.');
                id++;

                $scope.entryForm.$setPristine();
                $scope.entryForm.$setUntouched();
            }
        }

        function remove(index) {
            if (index > -1) {
                vm.entries.splice(index, 1);
                getTotal();
            }
        }

        function entryIsValid() {
            var message = '';

            if (vm.entry.value > vm.total && vm.entry.type === 2) {
                AlertFactory.showAlert('Saldo insuficiente para saque.');
                return;
            }

            if (!vm.entry || !vm.entry.value || vm.entry.value <= 0)
                message += 'Digite um valor maior que zero (0)';

            if (message) {
                AlertFactory.showAlert(message);
                return;
            }

            return true;
        }

        function showConfirm(ev, entry) {
            var typeName = entry.type === 1 ? 'Depósito' : 'Saque';

            var value = $filter('currency')(entry.value, 'R$');

            var alert = {
                description: entry.type === 1 ? 'Depósito' : 'Saque',
                message: 'Deseja remover o ' + typeName + ' no valor de ' + value + '?',
                title: 'Remover lançamento'
            }

            var index = vm.entries.indexOf(entry);

            AlertFactory.showConfirm(ev, alert).then((data) => {
                remove(index);
                AlertFactory.showAlert(alert.description + ' removido com sucesso.');
            })
        };
    };
})();