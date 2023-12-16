import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StoreService } from 'src/app/services/store.service';

@Component({
  standalone: true,
  selector: 'app-filters',
  imports: [MatSidenavModule, MatExpansionModule, MatListModule, NgFor, NgIf],
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