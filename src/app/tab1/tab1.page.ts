import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  allExpense: any;
  expenseRecord : {
    month: string;
    unit: number;
    amount: number;
  }
  constructor(private expenseservice: ExpenseService, 
    private router: Router) {

  }
  ionViewWillEnter() {
    this.getAllRecords();
  }
 
  getAllRecords() {
    this.allExpense = [];
    this.expenseservice.getNewsData().then((data) => {
      if (data.length == 0) {
        console.log("No data found!");
      } else {
        this.allExpense = data;
        console.log("Tab#1", this.allExpense);
      }
    })
  }
  logout() {
    this.expenseservice.logout();
    if (!this.expenseservice.loginState) {
      this.router.navigate(['/login']);
    }
  }

  addRecord(addrecord: any) {
    this.expenseservice.addRecordToFirestore(addrecord);
  }

}
