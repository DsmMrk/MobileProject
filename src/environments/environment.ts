// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl:'http://newsapi.org/v2/' ,
  apiKey:'9b9383bcb743451b93bceaaece38790b'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const firebaseConfig = {
  apiKey: "AIzaSyBm_FZwVvIrbwpR7htTnB59JOrXB5dXTiM",
  authDomain: "mobileprojectnews.firebaseapp.com",
  projectId: "mobileprojectnews",
  storageBucket: "mobileprojectnews.appspot.com",
  messagingSenderId: "1021921342459",
  appId: "1:1021921342459:web:2750246b9bd8ec5ebb915e",
  measurementId: "G-VLNZ35QJSB"
};
