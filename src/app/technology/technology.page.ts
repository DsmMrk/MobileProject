import { Component, OnInit } from '@angular/core';
import {ExpenseService} from '../expense.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.page.html',
  styleUrls: ['./technology.page.scss'],
})
export class TechnologyPage implements OnInit {
    newsArray: any = [];
    constructor(private expenseservice: ExpenseService, private router: Router) { }

    ngOnInit() {
        this.loadHeadLines('technology');
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
