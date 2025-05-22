import { Component } from '@angular/core';
import { HeaderNavigationComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/foter/foter.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderNavigationComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}

