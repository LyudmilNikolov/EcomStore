import { CurrencyPipe, NgClass, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Product } from 'src/app/models/product.model';

@Component({
  standalone: true,
  selector: '[app-product-box]',
  imports: [MatCardModule, MatIconModule, NgIf, NgClass, CurrencyPipe],
  templateUrl: './product-box.component.html',
})
export class ProductBoxComponent {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter<Product>();

  constructor() {}

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}