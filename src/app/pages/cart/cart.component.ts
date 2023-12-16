import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [NgIf, MatCardModule, MatIconModule, CurrencyPipe, MatTableModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart = signal<Cart>({ items: [] });
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  dataSource = signal<CartItem[]>([]);

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart.set(_cart);
      this.dataSource.set(_cart.items);
    });
  }

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
    this.cartService.removeQuantity(item);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }

  onCheckout(): void {
    this.cartService.clearCart();
    console.log("Checkout successfully");
  }
  onNavigateToHome(): void {
    this.router.navigate(['/home']);
  }
}