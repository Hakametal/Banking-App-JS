"use strict";

// User Data
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

// HTML Elements
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

//Event Handlers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const accounts = [account1, account2, account3, account4];
const eurToUsd = 1.1;
let currentAccount;

btnClose.addEventListener("click", e => {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

btnTransfer.addEventListener("click", e => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // This is the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
  }

  updateUI(currentAccount);
});

//
btnLogin.addEventListener("click", input => {
  input.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
  }

  updateUI(currentAccount);
});

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    
    <div class="movements__value">€ ${mov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `€ ${acc.balance}`;
};
displayBalance(account1);

const createUsername = accs => {
  accs.forEach(acc => {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(" ")
      .map(name => name[0])
      .join("");
  });
};
createUsername(accounts);

const calcDisplaySummary = acc => {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `€${incomes}`;

  const outgoes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `€${Math.abs(outgoes)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `€${Math.abs(interest)}`;
};

const updateUI = function (acc) {
  displayMovements(acc.movements);
  displayBalance(acc);
  calcDisplaySummary(acc);
};

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const totalDepositsUSD = movements
  .filter(move => move > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

const movementsUsd = movements.map(mov => eurToUsd * mov);
const movementsDes = movements.map((mov, i) => {
  if (mov > 0) {
    return `You deposited ${i + 1}: ${mov}`;
  } else {
    return `You withdrew ${i + 1}: ${Math.abs(mov)}`;
  }
});

const deposits = movements.filter(mov => mov > 0);
const withdrawals = movements.filter(mov => mov < 0);
const balance = movements.reduce((acc, cur) => acc + cur, 0);

// const dogs = {
//   juliaDogs: [3, 5, 2, 12, 7],
//   kateDogs: [4, 1, 15, 8, 3],
// };

// const checkDogs = () => {
//   const copyJulia = dogs.juliaDogs.slice(1, -2);
//   const allDogs = [...copyJulia, ...dogs.kateDogs];

//   allDogs.forEach((age, i) => {
//     if (age >= 3) {
//       console.log(`Dog number ${i + 1} is an adult, and is ${age} years old.`);
//     } else {
//       console.log(`Dog number ${i + 1} is a puppy, and is ${age} years old.`);
//     }
//   });
// };

// const julia = [5, 2, 4, 1, 15, 8, 3];
// const kate = [16, 6, 10, 5, 6, 1, 4];

// const calAverageHumanAge = ages => {
//   const humanAge = ages
//     .map(dogAge => (dogAge <= 2 ? dogAge * 2 : dogAge + 16 * 4))
//     .filter(ages => ages > 18)
//     .reduce((acc, ages, i, arr) => acc + ages / arr.length, 0);

//   console.log(humanAge);
// };

// calAverageHumanAge(julia);
// calAverageHumanAge(kate);

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
