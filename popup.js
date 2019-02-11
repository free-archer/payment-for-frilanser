//console.log('Start1');
document.addEventListener("DOMContentLoaded", function () {
   console.log('Start');
});

const Payment = new PaymentClass();

const table = document.getElementById('payment-table');
Payment.table = table;
const ulCategory = document.getElementById('ul-cat');
Payment.ulCategory = ulCategory;
const divMain = document.getElementById('main');
Payment.divMain = divMain;

Payment.Init();








