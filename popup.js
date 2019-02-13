"use strict";
let Payment = new PaymentClass();

const table = document.getElementById('payment-table');
Payment.table = table;


const ulCategory = document.getElementById('ul-cat');
Payment.ulCategory = ulCategory;
const divMain = document.getElementById('main');
Payment.divMain = divMain;

Payment.Init();

const myMap = new Map();
const a = {a:1};
const b = {b:1};
const c = {a:1};

myMap.set(12,a);
myMap.set(22,b);
myMap.set(6,c);

console.log(myMap);

const data = myMap.values();
const keys = myMap.keys();
/* for (const it of keys) {
    console.log(it);
    console.log(myMap.get(it));
} */

myMap.forEach((it) => {
    console.log(it);
})