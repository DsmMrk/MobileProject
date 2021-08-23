import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BusinessPage } from '../business/business.page';
import { EntertainmentPage } from '../entertainment/entertainment.page';
import { ExpenseService } from '../expense.service';
import { HealthPage } from '../health/health.page';
import { SportPage } from '../sport/sport.page';
import { Tab1Page } from '../tab1/tab1.page';
import { UpdatePage } from '../update/update.page';
import { ViewPage } from '../view/view.page';
import { Router } from '@angular/router';
import { TechnologyPage } from '../technology/technology.page';
import { SciencePage } from '../science/science.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  allExpenses: any;
  constructor(private expenseService: ExpenseService, private modalController: ModalController) { }

  ionViewWillEnter() {
    this.getAllRecords();
  }
  getAllRecords() {
    this.allExpenses = [];
    this.expenseService.getNewsData().then((data: any) => {
      if(data.length == 0) {
        console.log('No data found!');
      }else{
        this.allExpenses = data;
        console.log('Tab2#', this.allExpenses);
      }
    });
  }
  deleteRecord(id: any) {
    console.log(id, " to be deleted!");
    this.expenseService.deleteRecord(id).then(() => {
      this.getAllRecords();
    });
  }

  async updateRecord(record: any) {
    console.log('update#', record);
    const modal = await this.modalController.create({
      component: UpdatePage,
      componentProps: {
        'id': record.id,
        'month': record.month,
        'unit': record.unit,
        'amount': record.amount
      }
    });
    
    modal.onDidDismiss().then(() => {
      this.getAllRecords();
    });

    return await modal.present();
  }
  async business() {
    const modal = await this.modalController.create({
      component: BusinessPage
      
    })

    return await modal.present()

  }
  async entertainment() {
      const modal = await this.modalController.create({
        component: EntertainmentPage
      })
      return await modal.present()
}
async health() {
  const modal = await this.modalController.create({
    component: HealthPage
  })
  return await modal.present()
}
async science() {
  const modal = await this.modalController.create({
    component: SciencePage
  })
  return await modal.present()
}
async sport() {
  const modal = await this.modalController.create({
    component: SportPage
  })
  return await modal.present()
}
async technology() {
  const modal = await this.modalController.create({
    component: TechnologyPage
  })
  return await modal.present()
}


}
