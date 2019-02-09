const PaymentClass = function () {
  this.pymentString = {
    id: 0,
    date: new Date(),
    summa: 0,
    client: '',
    comment: ''
  };

  this.Data = [];

  this.setStorage = function() {
      chrome.storage.local.set({"pymentData": this.Data});
  };

  this.getStorage = function () {
      this.pymentData = chrome.storage.local.get(["pymentData"],  function(result) {
        console.log('Value currently is ' + result);
      });
  };

  this.addNewRow = (table, Data) => {
    Data.forEach(element => {
      const row = table.insertRow();
      row.insertCell(0).textContent = element.id;
      row.insertCell(1).textContent = element.date;
      row.insertCell(2).textContent = element.summa;
      row.insertCell(3).textContent = element.client;
      row.insertCell(4).textContent = element.comment;
    });

  const addNewRow1 = () => {
    return 1;
  }
  }
};
