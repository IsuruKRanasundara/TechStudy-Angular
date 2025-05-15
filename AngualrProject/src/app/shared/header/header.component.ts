import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'; // For mat-tab-group and mat-tab

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Don't leave this empty like ['']
  imports: [MatTabsModule], // Import necessary Angular Material modules
})
export class HeaderComponent {}
