import { Routes } from '@angular/router';
// import { HomeComponent } from './home/home.component';
// Update the path below if the file exists elsewhere, for example:

export const appRoutes: Routes = [
  {
        path: '',
        loadComponent: () => import('./layout/home-page/home-page.component').then(m => m.HomePageComponent),
        data: {
          title: 'Home Page',
          description: 'Welcome to the home page of our Angular application!'
        }
    },
    {
        path: 'about',
        loadComponent: () => import('./layout/about-page/about-page.component').then(m => m.AboutComponent),
        data: {
          title: 'About Us',
          description: 'Learn more about our organization and mission.'
        }
    },
    
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
