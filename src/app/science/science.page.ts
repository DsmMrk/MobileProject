import { Component, OnInit } from '@angular/core';
import {ExpenseService} from '../expense.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-science',
  templateUrl: './science.page.html',
  styleUrls: ['./science.page.scss'],
})
export class SciencePage implements OnInit {

    newsArray: any = [];
    constructor(private expenseservice: ExpenseService, private router: Router) { }

    ngOnInit() {
        this.loadHeadLines('science');
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
