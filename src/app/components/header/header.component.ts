import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [MatIconModule, NgFor, NgIf, CurrencyPipe, MatMenuModule, MatToolbarModule, MatBadgeModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private _cart = signal<Cart>({ items: [] });
  itemsQuantity = signal(0);

  @Input()
  get cart(): Cart {
    return this._cart();
  }

  set cart(cart: Cart) {
    this._cart.set(cart);

    this.itemsQuantity.set(cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0));
  }

  constructor(private cartService: CartService, private router: Router) {}

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onNavigateToCart(): void {
    this.router.navigate(['cart']);
  }
}