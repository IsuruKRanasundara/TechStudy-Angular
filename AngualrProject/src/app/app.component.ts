import { Component } from '@angular/core';
import { HeaderNavigationComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/foter/foter.component';
import { RouterOutlet } from '@angular/router';
import { FirebaseApp } from '@angular/fire/app';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderNavigationComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private firebaseApp: FirebaseApp) {
    // Initialize Firebase if needed
    if (!this.firebaseApp) {
      console.error('Firebase app is not initialized');
    } else {
      console.log('Firebase app initialized successfully');
    }
  }
}

