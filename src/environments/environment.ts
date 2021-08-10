// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyA4s5S4BTmpX3M2jdVV2KvWjXUMRELS8aU',
    authDomain: 'turnero-99b58.firebaseapp.com',
    databaseURL: 'https://turnero-99b58.firebaseio.com',
    projectId: 'turnero-99b58',
    storageBucket: 'turnero-99b58.appspot.com',
    messagingSenderId: '621267265358',
    appId: '1:621267265358:web:047dac7ce24e286281601f'
  },

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

/*
!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA4s5S4BTmpX3M2jdVV2KvWjXUMRELS8aU",
    authDomain: "turnero-99b58.firebaseapp.com",
    databaseURL: "https://turnero-99b58.firebaseio.com",
    projectId: "turnero-99b58",
    storageBucket: "turnero-99b58.appspot.com",
    messagingSenderId: "621267265358",
    appId: "1:621267265358:web:047dac7ce24e286281601f"
  }; 
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>

*/