"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    
    <div class="movements__value">${mov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMovements(account1.movements);

const createUsername = function (accs) {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  });
};

createUsername(accounts);
console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;

const movementsUsd = movements.map(mov => eurToUsd * mov);

console.log(movements);
console.log(movementsUsd);

const movementsDes = movements.map((mov, i) => {
  if (mov > 0) {
    return `You deposited ${i + 1}: ${mov}`;
  } else {
    return `You withdrew ${i + 1}: ${Math.abs(mov)}`;
  }
});

console.log(movementsDes);

// const dogs = {
//   juliaDogs: [3, 5, 2, 12, 7],
//   kateDogs: [4, 1, 15, 8, 3],
// };

// const checkDogs = () => {
//   const copyJulia = dogs.juliaDogs.slice(1, -2);
//   const allDogs = [...copyJulia, ...dogs.kateDogs];

//   allDogs.forEach(function (age, i) {
//     if (age >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${age} years old.`);
//     } else {
//       console.log(`Dog number ${i + 1} is a puppy, and is ${age} years old.`);
//     }
//   });
// };

// checkDogs();
/////////////////////////////////////////////////

// let arr = ["a", "b", "c", "d", "e"];
// let arr2 = ["a", "b", "c", "d", "e"];

// console.log(arr.slice(2));
// console.log(arr.slice(-2));

// console.log(arr.splice(2));

// console.log(arr2.reverse());
// console.log(arr2);

// const letters = arr.concat(arr2);
// console.log(letters);
// console.log([...arr, ...arr2]);

// console.log(letters.join(" - "));

// const arr3 = [23, 11, 64];
// console.log(arr3.at(0));
// console.log(arr3[arr3.length - 1]);
// console.log(arr3.at(-1));
// console.log("Gerald".at(0));

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log("---------------");

// movements.forEach(function (movement, index, array) {
//   if (movement > 0) {
//     console.log(`You deposited ${index + 1}: ${movement}`);
//   } else {
//     console.log(`You withdrew ${index + 1}: ${Math.abs(movement)}`);
//   }
// });

// console.log("-----------");

// movements.forEach(movement => {
//   if (movement > 0) {
//     console.log(`You deposited ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// });
