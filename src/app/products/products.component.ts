// products.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = [];
  public keyword: string = "";

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: data => {
        this.products = data;
        console.log('All products:', this.products); // Log all products
      },
      error: err => {
        console.error(err);
      }
    });
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: updatedProduct => {
        product.checked = !product.checked;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  handleDelete(product: Product) {
    if (confirm("Etes vous sure?!")) {
      this.productService.deleteProduct(product).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== product.id);
        },
        error: err => {
          console.error(err);
        }
      });
    }
  }

  searchProducts() {
    console.log('Searching for:', this.keyword); // Log the keyword
    this.productService.searchProducts(this.keyword).subscribe({
      next: value => {
        console.log('Search results:', value); // Log the search results
        this.products = value;
      },
      error: err => {
        console.error('Search error:', err);
      }
    });
  }

}
