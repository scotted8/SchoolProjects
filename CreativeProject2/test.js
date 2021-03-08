let a = [1,2,3,4,5,6,7,8,9,10];

let total = 2;
let c = a.reduce((total, number) => { console.log('total = ', total, 'number = ', number); return (total + number) }, 10);
console.log(c);
