console.log('Start1');
document.addEventListener("DOMContentLoaded", function () {
   console.log('Start');
});

const Payment = new PaymentClass();

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
Payment.addNewRow(table, [testData]);

Payment.setStorage();
const res = chrome.storage.local.set({"data":55});
console.log(res);

const res2 = chrome.storage.local.get([{'data' : {}}], function(result) {return result});
console.log(res2);

const storegeData = Payment.getStorage();
console.log(storegeData);