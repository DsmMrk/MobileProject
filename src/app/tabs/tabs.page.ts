import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExpenseService } from 'src/app/expense.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private expenseservice: ExpenseService, private router: Router,
    private http : HttpClient
   ) { }

  ionViewWillEnter() {
    console.log('Login state:', this.expenseservice.loginState);
    if (!this.expenseservice.loginState) {
      this.router.navigate(['/']);
    }
  }
}