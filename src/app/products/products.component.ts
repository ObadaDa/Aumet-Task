import { Component } from '@angular/core';
import { SampleData } from '../services/sampleData';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  public medicalLines = [];
  public selectedLine;
  public selectedCategory;
  public selectedProducts = [];

  public filteredLines;
  public filteredCategories;
  public filteredProducts;

  public set fieldValue(val) {
    this.search(val);
  }

  constructor(){
    //this should be returned by a resolver as a back end request, but for now let us keep it like this
    this.medicalLines = new SampleData().data.lines;
    this.resetLines();
  }

  selectLine(medLine) {
    this.selectedLine = medLine;
    this.resetCategories(this.selectedLine.categories)
  }

  selectCategory(category) {
    this.selectedCategory = category;
    this.resetProducts(this.selectedCategory.products);
  }

  updateSelectedProducts(SelectedProduct) {
    let productIndex = this.selectedProducts.indexOf(SelectedProduct);
    if(productIndex != -1){
      this.selectedProducts.splice(productIndex, 1);
    }else {
      this.selectedProducts.push(SelectedProduct);
    }
  }

  search(searchText){
    if(this.selectedCategory){
      this.filteredProducts = this.filterValues(this.selectedCategory.products, searchText);
    }else if(this.selectedLine){
      this.filteredCategories = this.filterValues(this.selectedLine.categories, searchText);
    }else{
      this.filteredLines = this.filterValues(this.medicalLines, searchText);
    }
  }

  resetLines(){
    this.filteredLines = this.medicalLines;
  }

  resetCategories(categories) {
    this.filteredCategories = categories
  }

  resetProducts(products) {
    this.filteredProducts = products;
  }

  filterValues(array, text){
    return array.filter(item => item.name.toLowerCase().includes(text.toLowerCase()));
  }

  clear() {
    this.clearSelectedLine();
    this.clearSelectedCategory();
  }

  clearSelectedLine() {
    this.selectedLine = this.filteredCategories = undefined;
  }

  clearSelectedCategory() {
    this.selectedCategory = this.filteredProducts = undefined;
    this.clearValue();
  }

  clearValue() {
    this.fieldValue = '';
  }
}

