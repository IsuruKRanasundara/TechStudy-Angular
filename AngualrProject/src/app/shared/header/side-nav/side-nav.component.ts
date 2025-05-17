import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @title Nested menu
 */
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  standalone: true,
  imports: [
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    CommonModule,
    MatMenuModule
    

  ],
})
export class SideNavComponent {
  isSidenavOpen = false;

  treeData = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      children: [],
    },
    {
      name: 'Settings',
      icon: 'settings',
      children: [
        { name: 'Profile', icon: 'person' },
        { name: 'Security', icon: 'security' },
      ],
    },
    {
      name: 'Help',
      icon: 'help',
      children: [],
    },
  ];

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }



  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'custom_menu',
      sanitizer.bypassSecurityTrustResourceUrl('menu.svg')
    );
  }
}
