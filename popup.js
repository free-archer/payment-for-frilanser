//console.log('Start1');
document.addEventListener("DOMContentLoaded", function () {
   console.log('Start');
});

const Payment = new PaymentClass();

const table = document.getElementById('payment-table');
Payment.table = table;

Payment.getStorage();

const divMain = document.getElementById('main');
Payment.addButtonAdd(divMain, ['btn', 'btn-add']);
Payment.addButtonSave(divMain, ['btn', 'btn-save']);


