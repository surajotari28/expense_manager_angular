var getLocalData = function (key) {
  if (localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return false;
};

var setLocalData = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

document.getElementById("expForm").addEventListener("submit", addExpense);

// array reading from localStorage

var myArr = getLocalData("users") || [];

function pushdata() {
  var inputText = prompt("Enter Name");
  myArr.push(inputText);

  setLocalData("users", myArr);
  printUserOption();
}

function printUserOption() {
  var pval = '<option value=""> -select- </option>';

  for (var u of myArr) {
    pval += `<option value="${u}">${u}</option>`;
  }
  document.querySelector(".users").innerHTML = pval;
}
printUserOption();

function addExpense(e) {
  e.preventDefault();
  var expenses = getLocalData("expenses") || [];

  let type = document.getElementById("type").value;
  let currency = document.getElementById("currency").value;
  let pText = document.querySelector(".users").value;
  let name = document.getElementById("name").value;
  let date = document.getElementById("date").value;
  let amount = document.getElementById("amount").value;

  if (type != "chooseOne" && name.length > 0 && date != 0 && amount > 0) {
    const expense = {
      type,
      currency,
      pText,
      name,
      date,
      amount,
      id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
    };

    expenses.push(expense);
    setLocalData("expenses", expenses);
    showExpenses();
  }
}

const showExpenses = () => {
  var expenses = getLocalData("expenses") || [];
  const expenseTable = document.getElementById("expenseTable");
  expenseTable.innerHTML = "";

  for (let i = 0; i < expenses.length; i++) {
    expenseTable.innerHTML += `
            <tr>
                <td>${expenses[i].type}</td>
                <td>${expenses[i].currency}</td>
                <td>${expenses[i].pText}</td>
                <td>${expenses[i].name}</td>
                <td>${expenses[i].date}</td>
                <td>${expenses[i].amount}</td>
                <td><a class="deleteButton" onclick="deleteExpense(${expenses[i].id})">
                    Delete</td>
            </tr>
        `;
  }
};

const deleteExpense = (id) => {
  var expenses = getLocalData("expenses") || [];
  for (let i = 0; i < expenses.length; i++) {
    if (expenses[i].id == id) {
      expenses.splice(i, 1);
    }
  }

  // localStorage
  setLocalData("expenses", expenses);
  showExpenses();
};

showExpenses();
