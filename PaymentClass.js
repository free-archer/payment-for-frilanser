const PaymentClass = function () {
  this.pymentString = {
    date: new Date(),
    summa: 0,
    client: '',
    comment: ''
  };

  this.pymentData = [];

  this.setStorage = function() {
      chrome.storage.local.set("pymentData", this.pymentData);
  };

    this.getStorage = function () {
        this.pymentData = chrome.storage.local.get("pymentData");
    };
};