import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();
  categories = signal<string[]>([]);

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.getAllCategories().subscribe((response: Array<string>) => {
      this.categories.set(response);
    });
  }

  onSelectionChange(event: MatSelectionListChange): void {
    const selectedCategory = event.options[0].value;
    this.showCategory.emit(selectedCategory);
  }
}