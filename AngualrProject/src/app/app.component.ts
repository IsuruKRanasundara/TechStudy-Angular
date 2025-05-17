import { Component } from "@angular/core";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/foter/foter.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, RouterModule, FooterComponent], // Now valid
})
export class AppComponent {}

