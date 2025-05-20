import { Component } from "@angular/core";
import {  HeaderNavigationComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/foter/foter.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderNavigationComponent, RouterModule, FooterComponent, HeaderNavigationComponent, CommonModule], // Now valid
})
export class AppComponent {}

