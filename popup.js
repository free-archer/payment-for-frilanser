//console.log('Start1');
document.addEventListener("DOMContentLoaded", function () {
   console.log('Start');
});

const Payment = new PaymentClass();
console.log(Payment);
Payment.getStorage();
console.log('Payment.Data');
console.log(Payment.Data);

const table = document.getElementById('payment-table');
Payment.table = table;

const divMain = document.getElementById('main');
Payment.addButtonAdd(divMain, 'btn-add');
Payment.addButtonSave(divMain, 'btn-save');


