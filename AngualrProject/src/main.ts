import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { FirebaseService } from '../FireBase/BackEnd/FireBaseConfig';
import { appRoutes } from './app/app.routes';

const firebaseService = new FirebaseService();

bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => firebaseService.app),
    provideAuth(() => getAuth(firebaseService.app)),
    provideFirestore(() => getFirestore(firebaseService.app)),
    provideRouter(appRoutes),
  ]
})
  .catch((err) => console.error(err));
