  import { ApplicationConfig, importProvidersFrom } from '@angular/core';
  import { provideRouter } from '@angular/router';
  import { routes } from './app.routes';
  import { provideHttpClient } from '@angular/common/http';
  import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
  import { getAuth, provideAuth} from '@angular/fire/auth'
  import { getFirestore, provideFirestore } from '@angular/fire/firestore'

  const firebaseConfig = {
    apiKey: "AIzaSyD1MWtWirm1alp-8pdtQdrOtdD1q2nHIZk",
    authDomain: "car-market-92455.firebaseapp.com",
    projectId: "car-market-92455",
    storageBucket: "car-market-92455.firebasestorage.app",
    messagingSenderId: "204620360559",
    appId: "1:204620360559:web:d17983a3cfdc86d4db969a"
  };

  export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideHttpClient(),      
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(()=>getAuth()),
        provideFirestore(()=>getFirestore())
      
    ],
  };
