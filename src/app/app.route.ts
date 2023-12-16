import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';

export const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];