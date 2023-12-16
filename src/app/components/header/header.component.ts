import { Component, Input, signal } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
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

  constructor(private cartService: CartService) {}

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
}