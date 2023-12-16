import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { FiltersComponent } from './components/filters/filters.component';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { ProductsHeaderComponent } from './components/products-header/products-header.component';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [MatSidenavModule, FiltersComponent, ProductsHeaderComponent, MatGridListModule,
     ProductBoxComponent, NgFor, NgIf],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  cols = signal(3);
  rowHeight = signal(ROWS_HEIGHT[this.cols()]);
  products = signal<Array<Product>>([]);
  count = signal('12');
  sort = signal('desc');
  category = signal<string | undefined>(undefined);

  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols.set(colsNum);
    this.rowHeight.set(ROWS_HEIGHT[colsNum]);
  }

  onItemsCountChange(count: number): void {
    this.count.set(count.toString());
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort.set(newSort);
    this.getProducts();
  }

  onShowCategory(newCategory: string): void {
    this.category.set(newCategory);
    this.getProducts();
  }

  getProducts(): void {
    this.storeService
      .getAllProducts(this.count(), this.sort(), this.category())
      .subscribe((_products) => {
        this.products.set(_products);
      });
  }

  onAddToCart(product: any): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }
}