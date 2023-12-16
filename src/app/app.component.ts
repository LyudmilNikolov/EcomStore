import { Component, OnInit, signal } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';
import { StoreService } from './services/store.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [HeaderComponent, RouterModule, MatSnackBarModule],
  templateUrl: './app.component.html',
  providers: [CartService, StoreService]
})
export class AppComponent implements OnInit {
  cart = signal<Cart>({ items: [] });

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart.set(_cart);
    });
  }
}