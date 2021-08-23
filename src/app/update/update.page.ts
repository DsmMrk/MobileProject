import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  @Input() id: any;
  @Input() month: any;
  @Input() unit: any;
  @Input() amount: any;

  expenseRecord: {
    id: string;
    month: string;
    unit: number;
    amount: number;
  }

  constructor(private expenseService: ExpenseService, private modalController: ModalController) { }

  ngOnInit() {
    this.expenseRecord = {
      id: this.id,
      month: this.month,
      unit: this.unit,
      amount: this.amount
    }
  }

  updateRecord(record: any) {
    this.expenseService.updateRecord(record).then(() => {
      this.closeModalPage();
    });
  }

  closeModalPage() {
    this.modalController.dismiss(this.expenseRecord);
  }
}
