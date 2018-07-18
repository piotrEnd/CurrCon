//variables for user input
const form = document.querySelector('.form');
const amount = document.querySelector('#amount');
const rate = document.querySelector('#rate');
const list = document.querySelector('.list');
const clear = document.querySelector('.clear');
const message = document.querySelector('message');

//listen for input
listenForInput();

function listenForInput() {
   document.addEventListener('DOMContentLoaded', getData);

   form.addEventListener('submit', addAmount);
   list.addEventListener('click', removeAmount);
   clear.addEventListener('click', clearAll);
}

//check local storage
const checkLocalStorage = function() {
   const localStorageData = localStorage.getItem('data');
   if (localStorageData !== null) {
      return JSON.parse(localStorageData);
   } else {
      return [];
   }
};

//get data from local storage
function getData() {
   let data = checkLocalStorage();

   data.forEach(function(element) {
      const li = document.createElement('li');
      li.className = 'item';
      li.appendChild(document.createTextNode(element));
      const link = document.createElement('a');
      link.className = 'trash';
      link.innerHTML = '<i class="trash icon grey"></i>';
      li.appendChild(link);

      list.appendChild(li);
   });
}

//add item to list
function addAmount(e) {
   if (amount.value === '' || rate.value === '') {
      showError('fill out both EXCHANGE RATE and AMOUNT');
   }

   //calculate
   let calcAmount = amount.value / rate.value;
   calcAmount = Math.round(calcAmount * 100) / 100;

   //add new item
   const li = document.createElement('li');
   li.className = 'item';
   li.appendChild(document.createTextNode(`${amount.value}PLN \u2192 ${calcAmount}\u20AC`));

   const link = document.createElement('a');
   link.className = 'trash';
   link.innerHTML = '<i class="trash icon grey"></i>';
   li.appendChild(link);

   list.appendChild(li);
   storeData(`${amount.value}PLN \u2192 ${calcAmount}\u20AC`);
   amount.value = '';

   e.preventDefault();
}

//store in local storage
function storeData(element) {
   let data = checkLocalStorage();

   data.push(element);
   localStorage.setItem('data', JSON.stringify(data));
}

//remove item from list
function removeAmount(e) {
   if (e.target.parentElement.classList.contains('trash'));
   {
      e.target.parentElement.parentElement.remove();
      removeData(e.target.parentElement.parentElement);
   }
}

//remove from local storage
function removeData(element) {
   let data = checkLocalStorage();

   data.forEach(function(part, index) {
      if (element.textContent === part) {
         data.splice(index, 1);
      }
   });

   localStorage.setItem('data', JSON.stringify(data));
}

//clear all items (also from local storage)
function clearAll() {
   list.innerHTML = '';
   localStorage.clear();
}

//message for wrong input
function showError(message) {
   const warning = document.createElement('div');

   const feedback = document.querySelector('#feedback');
   const empty = document.querySelector('#empty');

   warning.className = 'ui message info';
   warning.appendChild(document.createTextNode(message));

   feedback.insertBefore(warning, empty);
   setTimeout(function() {
      document.querySelector('.message').remove();
   }, 3000);
}
