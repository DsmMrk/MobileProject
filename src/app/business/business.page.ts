import { Component, OnInit } from '@angular/core';
import {ExpenseService} from '../expense.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-business',
  templateUrl: './business.page.html',
  styleUrls: ['./business.page.scss'],
})
export class BusinessPage implements OnInit {
  newsArray: any = [];
  constructor(private expenseservice: ExpenseService, private router: Router) { }

  ngOnInit() {
    this.loadHeadLines('business');
  }

  loadHeadLines(category) {
    this.expenseservice.getNewbyCategory(category).subscribe(news => {
        this.newsArray = news['articles'];
        console.log(this.newsArray);
    });
}
getDetails(news) {
    this.router.navigate(['/newsdetail', { 'title': news.title, 'desc': news.description, 'img': news.urlToImage, 'url': news.url }]);
}
}

