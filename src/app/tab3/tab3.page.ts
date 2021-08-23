import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { ExpenseService } from '../expense.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';


export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})

export class Tab3Page {
  newsArray: any = [];
  expenseRecord :{
    detail: string
  }
  // File upload task 
  fileUploadTask: AngularFireUploadTask;

  // Upload progress
  percentageVal: Observable<number>;

  // Track file uploading with snapshot
  trackSnapshot: Observable<any>;

  // Uploaded File URL
  UploadedImageURL: Observable<string>;

  // Uploaded image collection
  files: Observable<imgFile[]>;

  // Image specifications
  imgName: string;
  imgSize: number;

  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;

  private filesCollection: AngularFirestoreCollection<imgFile>;
  
  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private expensesrvice: ExpenseService,
    private router: Router,
    private http:HttpClient
  ) {
    this.isFileUploading = false;
    this.isFileUploaded = false;
    this.expenseRecord ={
      detail: '',
    }
    
    // Define uploaded files collection
    this.filesCollection = afs.collection<imgFile>('imagesCollection');
    this.files = this.filesCollection.valueChanges();
  }


  uploadImage(event: FileList) {
      
      const file = event.item(0)

      // Image validation
      if (file.type.split('/')[0] !== 'image') { 
        console.log('File type is not supported!')
        return;
      }

      this.isFileUploading = true;
      this.isFileUploaded = false;

      this.imgName = file.name;

      // Storage path
      const fileStoragePath = `filesStorage/${new Date().getTime()}_${file.name}`;

      // Image reference
      const imageRef = this.afStorage.ref(fileStoragePath);

      // File upload task
      this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);

      // Show uploading progress
      this.percentageVal = this.fileUploadTask.percentageChanges();
      this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
        
        finalize(() => {
          // Retreive uploaded image storage path
          this.UploadedImageURL = imageRef.getDownloadURL();
          
          this.UploadedImageURL.subscribe(resp=>{
            this.storeFilesFirebase({
              name: file.name,
              filepath: resp,
              size: this.imgSize
            });
            this.isFileUploading = false;
            this.isFileUploaded = true;
          },error=>{
            console.log(error);
          })
        }),
        tap(snap => {
            this.imgSize = snap.totalBytes;
        })
      )
  }


  storeFilesFirebase(image: imgFile) {
      const fileId = this.afs.createId();
      
      this.filesCollection.doc(fileId).set(image).then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      });
  }
  ngOnInit(): void {
    this.loadHeadLines();
  }

  loadHeadLines() {
    this.expensesrvice.getNews().subscribe(news => {
      this.newsArray = news['articles'];
      console.log(this.newsArray);
    });
  }

    getDetails(news) {
      this.router.navigate(['/newsdetail', { 'title': news.title, 'desc': news.description, 'img': news.urlToImage, 'url': news.url }]);
    }
}