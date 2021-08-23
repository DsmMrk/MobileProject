import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { LoadingController } from '@ionic/angular';
import { AngularFireAuth} from '@angular/fire/auth';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  public baseUrl: any = 'https://newsapi.org/v2/';
  public country: any = 'country=in';
  public apiKey: any = '&apiKey=9b9383bcb743451b93bceaaece38790b';
  loading: any;
  public loginState: boolean

  constructor(private firestore: AngularFirestore, private toastCtrl: ToastController,
    private loadingController: LoadingController, private fireauth: AngularFireAuth,
    private http: HttpClient) {

      this.loginState = false;
    }
    getNews() {
      const url = this.baseUrl + 'top-headlines?' + this.country + this.apiKey;
      return this.http.get(url);
    }
  
    getNewbyCategory(category) {
      const url = this.baseUrl + 'top-headlines?' + this.country + '&category=' + category + this.apiKey;
      return this.http.get(url);
    }
   async signWithEmail(email: string, password: string) {
     await this.fireauth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.loginState = true;
      })
      .catch(err => {
        this.loginState = false;
      })
   }

   logout() {
     this.fireauth.signOut();
     this.loginState = false;
   }

  async presentToast(msg: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }  

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await this.loading.present();
  }

  stopPresentLoading() {
    this.loading.dismiss();
  }

  addRecordToFirestore(addrecord: any) {
    console.log(addrecord);
    this.firestore.collection('/newsdetail/').add(addrecord).then(() => {
      this.presentToast("Your record is inserted successfully...");
    })
   
  }

  
 
  

  async updateRecord(record: any) {
    // let updaterecord = {}
    // updaterecord['month'] = record.month;
    // updaterecord['unit'] = record.unit;
    // updaterecord['amount'] = record.amount;
    // await this.firestore.doc('/newsdetail/' + record.id).update(updaterecord)
    //   .then(() => {
    //     this.presentToast("Update record successfully...");
    //   });
  }

  async deleteRecord(id: any) {
    await this.firestore.doc('/newsdetail/' + id).delete().then(() => {
      this.presentToast("Delete record successfully...");
    });
  }
  async getNewsData(){
    let recs: any = []
    this.presentLoading()
    await this.firestore.collection('/newsdetail/').get()
    .toPromise().then(res => {
      res.forEach((doc: any ) => {
        recs.push({
          id: doc.id,
          detailnews: doc.data().detailnews,
          topic:doc.data().topic,
          image: doc.data().image,
          detail:doc.data().detail,
          credits:doc.data().credits,
          category:doc.data().category,
        })
      })
      this.stopPresentLoading()
    })
    return recs
  }
}
