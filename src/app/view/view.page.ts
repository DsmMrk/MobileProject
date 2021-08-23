import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {
  allExpenses: any;
  newsRecord:{
    topic:string
    image:string
    detail:string
    
  }
  constructor(private expenseService: ExpenseService
     ) {
       this.newsRecord = {
         topic: '',
         image: '',
         detail: '',
         
       }
      
      }
  ionViewWillEnter() {
    this.getAllRecords();
  }

  getAllRecords() {
    this.allExpenses = [];
    this.expenseService.getNewsData().then((data) => {
      if (data.length == 0) {
        console.log("No data found!");
      } else {
        this.allExpenses = data;
        console.log("view", this.allExpenses);
      }
    })
  }

  ngOnInit() {
  }

 
  
  addRecord(addrecord: any){
    this.expenseService.addRecordToFirestore(addrecord)
  }
}
