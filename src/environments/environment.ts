// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

/*
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/6.6.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#reserved-urls -->

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>

npm install -g firebase-tools
firebase login
firebase init
firebase deploy
*/

export const environment = {
  production: false,  
  firebase: {
    apiKey: "AIzaSyCte0oSxwbxgrWIfiuOC-iAHTupSda34LE",
    authDomain: "ng-fitness-tracker-58b63.firebaseapp.com",
    databaseURL: "https://ng-fitness-tracker-58b63.firebaseio.com",
    projectId: "ng-fitness-tracker-58b63",
    storageBucket: "ng-fitness-tracker-58b63.appspot.com",
    messagingSenderId: "590136763467",
    appId: "1:590136763467:web:1c2db08c4d872cf39ad9ce"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
