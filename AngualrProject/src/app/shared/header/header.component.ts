import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'; // For mat-tab-group and mat-tab
import { SideNavComponent } from '../../side-nav/side-nav.component';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // Don't leave this empty like ['']
  imports: [MatTabsModule, SideNavComponent], // Import necessary Angular Material modules
})
export class HeaderComponent {}
