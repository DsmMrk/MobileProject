import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-newsdetail',
  templateUrl: './newsdetail.page.html',
  styleUrls: ['./newsdetail.page.scss'],
})
export class NewsdetailPage implements OnInit {

  newsData: any;
  headLine: any;
  description: any;
  image: any;
  url: any;
  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.headLine = this.actRoute.snapshot.paramMap.get('title');
    this.description = this.actRoute.snapshot.paramMap.get('desc');
    this.image = this.actRoute.snapshot.paramMap.get('img');
    this.url = this.actRoute.snapshot.paramMap.get('url');
  }

}
