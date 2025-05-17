import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs'; // For mat-tab-group and mat-tab
import { SideNavComponent } from './side-nav/side-nav.component'; // Correct path
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [MatTabsModule, SideNavComponent,CommonModule], // Import SideNavComponent here
})
export class HeaderComponent {
  [x: string]: any;
  getTabIndex() {
    const index= document.querySelector('mat-tab-group')?.getAttribute('aria-posinset');
    return index;
  
}
}
