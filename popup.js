console.log('Start1');
document.addEventListener("DOMContentLoaded", function () {
   console.log('Start');
});

const Payment = new PaymentClass();
Payment.getStorage();
console.log(Payment.Data);

//testdate
const testData = {
  id: 2,
  date: new Date().toDateString(),
  summa: 2500,
  client: 'Федор',
  comment: 'отчет'
};
Payment.Data.push(testData);
//testdate

const table = document.getElementById('payment-table');
Payment.addNewRow(table, Payment.Data);


