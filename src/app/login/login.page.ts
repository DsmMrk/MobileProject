import { Component, OnInit } from '@angular/core';
import { ExpenseService } from 'src/app/expense.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(private expenseService: ExpenseService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertController: AlertController) {
    this.loginForm = this.formBuilder.group({
      'email': new FormControl('', Validators.compose([
        Validators.required, Validators.email
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit() {
  }

  async presentAlert(header: any, msg: any) {
    let alert = await this.alertController.create({
      header: header,
      message: msg,
      buttons: ['OK']
    });
    alert.present();
  }
  async login() {
    let data = this.loginForm.value;
    console.log(this.loginForm.value);
    console.log(data.email, data.password);
    if (!this.loginForm.valid) {
      this.presentAlert("Warning", "Invalid input!");
      return;
    }
    await this.expenseService.signWithEmail(data.email, data.password);
    if (this.expenseService.loginState == true) {
      this.router.navigate(['/']);
    } else {
      this.presentAlert("Authentication", "Login Failed!");
      return;
    }
  }
}
