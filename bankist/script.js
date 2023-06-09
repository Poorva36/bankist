'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};
//movement ke har element pr jakaer function run krega
/* account1.movements.forEach(function(num){
console.log(num);
})

for(let arr of account1.movements){
  console.log(arr);
} */

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const accounts = [account1, account2, account3, account4];

//  Elements

const labelWelcome = document.querySelector('.welcome');

// const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');

const labelSumIn = document.querySelector('.summary__value--in');

const labelSumOut = document.querySelector('.summary__value--out');

const labelSumInterest = document.querySelector('.summary__value--interest');
// const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');

const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');

const btnTransfer = document.querySelector('.form__btn--transfer');

// const btnLoan = document.querySelector('.form__btn--loan');

const btnClose = document.querySelector('.form__btn--close');

// const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');

const inputLoginPin = document.querySelector('.login__input--pin');
// ----------------------------------------------------------------------------------
const inputTransferTo = document.querySelector('.form__input--to');

const inputTransferAmount = document.querySelector('.form__input--amount');

// const inputLoanAmount = document.querySelector('.form__input--loan-amount');

const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/*<!-- beforebegin -->
<p>
  <!-- afterbegin -->
  foo
  <!-- beforeend -->
</p>
<!-- afterend --> */

const displayMovements = function (movement) {
  //forEach(function (current value, index, array)){   }
  movement.forEach(function (mov, index) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      index + 1
    }. ${type}</div>
        <div class="movements__value"> ${mov}€</div>
      </div>`;
    containerMovements.insertAdjacentHTML('beforeEnd', html);
  });
};

// displayMovements(account1.movements)

//print total sum of transactions from acc1 movements, and display in ui

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((sum, mov) => sum + mov, 0);
  /* other way just to understand above line
  let balance = acc.movements.reduce( (sum , mov) => sum+mov,0)*/

  labelBalance.innerHTML = `${acc.balance} EUR`; //doubt?????????????????
};
calcDisplayBalance(account1);
console.log(account1);

// const calcPrintBalance = function(movements){
//   const balance = movements.reduce( (sum , mov) => sum+mov,0)
// }
// calcPrintBalance()

// ----- print total withdraw amount from movement from account1-----------------

// const euroINR = 80
// const calcWithdrawSummary = function(movements){
//   const incomes = movements.filter( mov => mov<0)
//   .map( mov => mov*euroINR)
//   .reduce( (sum , mov) => sum+mov )

// }
// calcWithdrawSummary(account1.movements)

// print together income(deposit) and outcome(withdraw) and proint in ui by innerhtml---------

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((sum, mov) => sum + mov, 0);

  labelSumIn.innerHTML = `${incomes} €`;

  const outcome = acc.movements
    .filter(mov => mov < 0)
    .reduce((sum, mov) => sum + mov, 0);

  labelSumOut.innerHTML = `${outcome} €`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(mov => mov >= 1)
    // .filter((mov, i, arr) =>{
    //   console.log(arr);
    //  return mov >= 1 })

    .reduce((sum, mov) => sum + mov, 0);

  labelSumInterest.innerHTML = `${interest} €`;
};
// calcDisplaySummary(account1.movements)

//-------------------implementing login button-----------------------------------------------

/* preventdefault-- html form has a defualt behaviour when we click sumbit
   it reloads the page, so to prevent from reloading. */

//------------------creating user name---------------------------------------------------

const createUserName = function (accs) {
  accs.forEach(function (acc) {
    //acc.username - yeh hum key craete krrhe hai object ke bhar--- explicit
    //acc.owner- se nikalega values jo jayegi username main.

    acc.username = acc.owner //doubt ?- acc kaise accoun1,2,3,4 bnra hai?
      .toLowerCase()
      .split(' ')
      .map(firstname => firstname[0])
      .join('');
  });
};
createUserName(accounts);

console.log(accounts);

//--------------------updating UI------------------------------------
const upadteUi = function (acc) {
  displayMovements(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};

//-------------------------implementing login detail(username)----------------------------

let currentAccountLogin;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccountLogin = accounts.find( user => user.username === inputLoginUsername.value
  );

  //we have found the account by using find() hence, no need to find it again for pin.

  if (currentAccountLogin.pin === Number(inputLoginPin.value)) {
    //if this condition satisfy- display UI and  welcome msg
    labelWelcome.innerHTML = `Welcome Back, 
    ${currentAccountLogin.owner.split(' ')[0]}`;

    //display the app class - whole page--------------------
    containerApp.style.opacity = 100;

    //clear input fields-----------------------------------
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    // inputLoginPin.blur()

    //display movements
    displayMovements(currentAccountLogin.movements);

    //display balance
    calcDisplayBalance(currentAccountLogin);

    //display summary
    calcDisplaySummary(currentAccountLogin);
  }

  console.log(currentAccountLogin);
});

//transfer money section---------------------------------------------------------------------

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const transferTo = accounts.find( acc => acc.username === inputTransferTo.value
  );
  const amount = Number(inputTransferAmount.value);

  //clear the input---------------------------
  inputTransferAmount.value = '';
  inputTransferTo = '';

  //push()= amount which has been trasfer to new recipent
  if (
    amount > 0 &&
    currentAccountLogin.balance >= amount &&
    transferTo.username !== currentAccountLogin.username
  ) {
    //doing the transfer-----------------------
    currentAccountLogin.movements.push(-amount);
    transferTo.movements.push(amount);

    upadteUi(currentAccountLogin);
  } else {
    console.log('transfer fail');
  }
  // accounts.movements.push(amount);

  // console.log(trasferTo, amount);
});

//----------------------close account-------------------------------------------------------

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  
  if(inputCloseUsername.value===currentAccountLogin.username && Number(inputClosePin.value)===currentAccountLogin.pin ){
    
    console.log('account has been succefully closed');
    
    const index = accounts.findIndex( acc => acc.username===currentAccountLogin.username)
    console.log(index);

    //deleting all data from ui--------------------
    accounts.splice(index, 1)
    
    
    
    //vanish all the elements from the ui after closing account
    containerApp.style.opacity = 0;
    
    //change the main heading from welcome back to log in
    labelWelcome.innerHTML = 'Log in to get started'
    
    
    
  }
  else{
    console.log('invalid details found');
  }
  inputCloseUsername.value = ''
  inputClosePin.value = ''
// else{
//   console.log('invalid details found');
// }

});














//----------------------practice -----------------------------------------

// make a filter on movements and print the number which are greater than 0
// const deposit = account1.movements.filter( (mov) => {
//   return mov > 0
// })
// console.log(deposit)

// //by for of on movements and print the number which are greater than 0
// /*const depositsFor = []
// for (let mov of account1.movements){
//   if(mov > 0 ){
//     depositsFor.push(mov)
//   }
// } */

// //make a filter on movements and print the number which are lesser than 0
// const withdrawal = account1.movements.filter( mov => mov < 0)
// console.log(withdrawal);

// //by reduce  add all elements of movements-----

// /*here it is not needed to write sum = 0 because by default the passes parameters
//  value is 0 in  reduce */
// // let sum = 0

// //total , current value , current index , array { initial value }
// const balance = account1.movements.reduce( ( sum, mov , i) => {

//   console.log(`Iteration ${i}: ${sum} `);
//     return mov + sum
// },0)

// //above question by for of
// // let balance1 = 0
// // for (let mov of account1.movements){
// //     balance1 = balance1 + mov
// //     console.log(balance1);
// // }

// /* entries - whenever we use index in for of loop, we use entries as loop not take index.
// and alos use [] <- for parameter inside for of */
// let balance1 = 0
// for (let [ i , mov] of account1.movements.entries()){
//    balance1 = balance1 + mov
//    console.log(` Iteration ${i}: ${balance1}`)
// }

// const max = movements.reduce( (acc , mov) => {

//   if(acc > mov)
//     return acc
//   else
//     return mov

// }, movements[0] )
// console.log(max);

// // movements: [200, 450, -400, 3000, -650, -130, 70, 1300]

// // iteration 0 : 0
// // iteration 1 : 200
// // iteration 2 : 650
// // iteration 3 : 250

// // const inr = 80
// // const convertInr = movements.filter( (mov ) => {
// //    return mov>0
// // })
// // console.log(convertInr);

// // const conversion = convertInr.map( (mov) => {
// //     return mov*inr
// //     // console.log(`${mov}`* `${inr}`);
// // })
// // console.log(conversion);

// // const addConversion = conversion.reduce( (sum , mov) => {
// //    return sum+mov
// // })
// // console.log(addConversion);

// //---total all deposite from movement array and convet it into inr*80
// const eurToInr = 80
// const totalDepositInr = movements.filter( mov => mov>0 )
// .map( mov => mov*eurToInr)
// .reduce( (sum ,mov) => sum+mov ,0)
// console.log(totalDepositInr);

// //================find method=================================================

/* find work on the condition given to him, and return the element, depend upon, 
whether it is from object or array but find works on array always. */

// const finding = movements.find( mov => mov>0)
// console.log(finding);

// const account = accounts.find( acc => acc.owner==='Steven Thomas Williams')
// console.log(account);

// /* there are three important array methods that we will use all the time to perform data
//  transformation.
// these use to create new arays based on transforming data from another array. */

// /* 1) Map() : Used to loop over arrays  , similar to for each. but the differenc is: it creates
// the brand new array. it takes an array loop over in each interation, applies a simple operation
// that we specify to the cureent array element.
// It return a new array , containing the result of , applying an operation, on all
// original elements.

// eg:
// const array = [2,3,4,5,6,67]
// array.map(function(){
//   return num*10

// })

// 2) filter():
// It is use to filter for elements in the original array, which satisfy
// its certain condition.
// filter() returns a new array, containing the array elements, that passes a
// specify test condition.

// eg:
// let people = [ {age: 23 }, {age: 27 }, {age: 28 } ]

// people.filter( (person) =>
//  {
//   return person.age <= 3
// })

// people.filter(person => person.age <= 3)

// 3) reduce:
// As the name define it reduce the elements of an array into single value

// Use to boil down all the elements, of the original array into one single value.
// eg: adding of all elemnets together.

// const money = [23,45,67,89]
// const total = money.reduce(( sum , mov) => sum+amount )   // short hand of arrow

// //sum ke andar value return hoty hai hmesha
// const total = money.reduce(( sum , mov) =>
// {
//   return sum+mov )
// } // normally.

// // another eg:

// const money = [23,45,67,89]
// const sum = money.reduce(function( sum, amount)
// { return sum+amount } )
// */

//-------------------------------------find index method-----------------------------
/*it is also a array method like find(). it uses to gind the index of element but, 
only when we gave the condition, when condition satisfies, it gave the nearest and
first value index, and return single value, its is not affect our oroginal array.  */

let colors = ['pink', 'red', 'yellow', 'green'];

const findOut = colors.findIndex(clr => clr === 'yellow');
console.log(findOut);

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////

// /////////////////////////////////////////////////

// // function ke andar function ko call kiyaan(hof):------
// /* let sum = 0
// function add(a,b){
//   sum = a+b
//   sums(sum)

// }
// function sums(a){
//   console.log(a);
// }
// add(2,3) */

// // ***********************************converting EURO to USD------------

// // const eurTousd = 1.1
// // const movementUsd = account1.movements.map( function(mov){
// //     return (mov * eurTousd)
// // })
// // console.log(movementUsd);

// //by arrow function---------------
// const eurTousd = 1.1
// const movementUsd = account1.movements.map( mov => mov * eurTousd)
// console.log(movementUsd)

// // do above thing same with for of loop----------
// // const arr7 = []
// // for (let mov of account1.movements){
// //     arr7.push(mov * eurTousd)
// //   }
// //   console.log(arr7);

// // to know the description that movement is withdraw or deposite--------------
// const movementsDescription = account1.movements.map( (value , index ) =>
//   // if(value > 0 ){
//   //   return  `movement ${index+1}: you deposited ${value}`
//   // }
//   // else{
//   //   return `movement ${index+1}: you withdraw ${value}`
//   // }
//   `Movement ${index+1}: you ${value > 0 ? 'deposited' : 'withdrawal'} ${value}`
// )
// console.log(movementsDescription);

//-------------------computing name--------------------------------------------------

// const user = 'Simba'
// //split takes an array and stores the splitted data.
// const userName = user
// .toLowerCase()
// .split(' ')
// .map(firstname => firstname[0])
// .join('')
// console.log(userName);
