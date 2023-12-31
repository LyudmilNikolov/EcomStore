import { Component, EventEmitter, Output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  standalone: true,
  selector: 'app-products-header',
  imports: [MatCardModule, MatMenuModule, MatIconModule],
  templateUrl: './products-header.component.html',
})
export class ProductsHeaderComponent {
  itemsShowCount = signal(12);
  sort = signal('desc');

  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();

  constructor() {}

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

  onItemsUpdated(count: number): void {
    this.itemsCountChange.emit(count);
    this.itemsShowCount.set(count);
  }

  onSortUpdated(newSort: string): void {
    this.sortChange.emit(newSort);
    this.sort.set(newSort);
  }
}
