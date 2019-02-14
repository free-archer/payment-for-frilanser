"use strict";
let Payment = new PaymentClass();

const table = document.getElementById('payment-table');
Payment.table = table;


const ulCategory = document.getElementById('ul-cat');
Payment.ulCategory = ulCategory;

const divMain = document.getElementById('main');
Payment.divMain = divMain;

const ulCat= document.getElementById('ul-cat');
Payment.ulCat = ulCat;

Payment.Init();