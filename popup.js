"use strict";
let Payment = new PaymentClass();

const table = document.getElementById('payment-table');
Payment.table = table;


const ulCategory = document.getElementById('ul-cat');
Payment.ulCategory = ulCategory;
const divMain = document.getElementById('main');
Payment.divMain = divMain;

Payment.Init();

const isSet = new Map();
const a = {a:1};
const b = {b:1};
const c = {a:1};

isSet.set(12,a);
isSet.set(22,b);
isSet.set(6,c);

console.log(isSet);

const set2 = isSet.get(2);
console.log(set2);

const keys = isSet.keys();
const entries = isSet.entries();
console.log(keys);
console.log(entries);

const ar = Array.from(isSet.keys());
ar.sort((a,b) => {return a-b});





