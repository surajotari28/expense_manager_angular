import { Component } from '@angular/core';
// declare const pushdata: any;
// declare const printUserOption: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'expense-tracker-project';

  let getLocalData = function (key) {
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





  myArr: any=[];

    pushdata(){
      {
        var inputText = prompt("Enter Name");
        this.myArr.push(inputText);

        localStorage.setItem("users", this.myArr);
        printUserOption();
      }
    }
    printUserOption() {
      var pval = '<option value=""> -select- </option>';

      for (var u of this.myArr) {
        pval += `<option value="${u}">${u}</option>`;
      }
      document.querySelector(".users").innerHTML = pval;
    }
    printUserOption();

}
