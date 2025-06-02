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
  }, {
        path: 'contact',
        loadComponent: () => import('./layout/contact-page/contact-page.component').then(m => m.ContactComponent),
        data: {
          title: 'contact',
          description: 'Contact If having any concern about the content or furthere clarification'
        }
  }, {
      path: 'signIn',
      loadComponent: () => import('./layout/signin-page/signin-page.component').then(m => m.SigninPageComponent),
      data: {
        title: 'signIn',
        description:'SignIn explore the Knowledge in Technology Field'
      }
  }, 
       {
      path: 'signUp',
      loadComponent: () => import('./layout/sign-up-page/sign-up-page.component').then(m => m.SignupComponent),
      data: {
        title: 'signUp',
        description:'SignUp first to logIn to the System to Explore the knowledge'
      }
    },
    
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
