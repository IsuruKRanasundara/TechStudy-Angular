import { Component } from "@angular/core";
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/foter/foter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [HeaderComponent, FooterComponent, ], // Now valid
})
export class AppComponent {}
