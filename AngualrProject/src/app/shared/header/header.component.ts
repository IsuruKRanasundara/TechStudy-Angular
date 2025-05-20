// header-navigation.component.tsx

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,RouterLink ,NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header-navigation',
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [RouterLink], // Added RouterLink for navigation
  // Removed invalid imports array entry
})
export class HeaderNavigationComponent implements OnInit, OnDestroy {
  isMobileMenuOpen = false;
  mobileExpandedItem: string | null = null;
  currentRoute = '/';
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    // Track current route for active link styling
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Prevent body scrolling when menu is open
    document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : '';
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.mobileExpandedItem = null;
    document.body.style.overflow = '';
  }

  toggleMobileDropdown(item: string) {
    // On desktop, this function does nothing (dropdowns work on hover)
    // On mobile, this toggles the expanded state of a dropdown
    if (window.innerWidth <= 768) {
      this.mobileExpandedItem = this.mobileExpandedItem === item ? null : item;
    }
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }
}
// app.module.ts (or app.config.ts for standalone setup)
// Make sure to import and declare the component

