var balance = parseInt(localStorage.getItem('alkeWalletBalance')) || 0;
var user = localStorage.getItem('alkeWalletUser') || 'Usuario';

document.addEventListener('DOMContentLoaded', function () {
    var balanceElement = document.getElementById('userBalance');
    if (balanceElement) {
        balanceElement.innerText = balance;
    }

    var currentBalanceElement = document.getElementById('currentBalance');
    if (currentBalanceElement) {
        currentBalanceElement.innerText = balance;
    }

    var userNameElement = document.getElementById('userName');
    if (userNameElement) {
        userNameElement.innerText = user;
    }

    var loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            if (email && password) {
                localStorage.setItem('alkeWalletUser', email.split('@')[0]);
                window.location.href = 'menu.html';
            } else {
                alert('Por favor, completa todos los campos.');
            }
        });
    }

    var depositForm = document.getElementById('depositForm');
    if (depositForm) {
        depositForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var amount = parseInt(document.getElementById('depositAmount').value);
            if (amount > 0) {
                balance += amount;
                localStorage.setItem('alkeWalletBalance', balance);
                alert('¡Depósito realizado con éxito! Nuevo saldo: $' + balance);
                window.location.href = 'menu.html';
            } else {
                alert('Por favor, ingresa un monto válido.');
            }
        });
    }

    var sendMoneyForm = document.getElementById('sendMoneyForm');
    if (sendMoneyForm) {
        sendMoneyForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var amount = parseInt(document.getElementById('sendAmount').value);
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                localStorage.setItem('alkeWalletBalance', balance);
                alert('Transferencia exitosa. Nuevo saldo: $' + balance);
                window.location.href = 'menu.html';
            } else {
                alert('Fondos insuficientes o monto inválido.');
            }
        });

        var btnAddContact = document.getElementById('btnAddContact');
        if (btnAddContact) {
            btnAddContact.addEventListener('click', function () {
                var nombreContacto = prompt("Ingrese el nombre del nuevo contacto:");
                if (nombreContacto) {
                    alert("¡Se ha agregado el contacto " + nombreContacto + " exitosamente!");
                }
            });
        }
    }

    var transactionsTableBody = document.getElementById('transactionsTableBody');
    if (transactionsTableBody) {
        var transacciones = [
            { fecha: '19/01/2026', descripcion: 'Depósito en efectivo', tipo: 'Ingreso', monto: 5000 },
            { fecha: '18/01/2026', descripcion: 'Transferencia a Juan', tipo: 'Egreso', monto: 1200 },
            { fecha: '17/01/2026', descripcion: 'Pago de Servicios', tipo: 'Egreso', monto: 800 },
            { fecha: '15/01/2026', descripcion: 'Depósito de Nómina', tipo: 'Ingreso', monto: 20000 },
            { fecha: '12/01/2026', descripcion: 'Compra Supermercado', tipo: 'Egreso', monto: 3500 }
        ];

        // Generar filas de la tabla
        transacciones.forEach(function (tx) {
            var fila = '<tr>' +
                '<td>' + tx.fecha + '</td>' +
                '<td>' + tx.descripcion + '</td>' +
                '<td>' + tx.tipo + '</td>' +
                '<td class="text-end ' + (tx.tipo === 'Ingreso' ? 'text-success' : 'text-danger') + '">$' + tx.monto + '</td>' +
                '</tr>';
            transactionsTableBody.innerHTML += fila;
        });
    }
});
