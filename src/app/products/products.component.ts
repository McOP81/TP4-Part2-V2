// products.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductService, private router : Router, public appState : AppStateService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.appState.productsState.keyword,this.appState.productsState.currentPage,this.appState.productsState.pageSize).subscribe({
      next: (resp) => {
        this.appState.productsState.products=resp.body as Product[];
        let totalProducts:number=parseInt(resp.headers.get('X-Total-Count')!);
        this.appState.productsState.totalProducts=totalProducts;
        this.appState.productsState.totalPages = Math.floor(totalProducts / this.appState.productsState.pageSize);
        // this.totalPages = Math.ceil(totalProducts / this.pageSize);
        if(totalProducts % this.appState.productsState.pageSize !=0){
          this.appState.productsState.totalPages=this.appState.productsState.totalPages+1;
        }
        console.log("totalPages",this.appState.productsState.totalPages);
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
          this.appState.productsState.products = this.appState.productsState.products.filter((p:any) => p.id !== product.id);
        },
        error: err => {
          console.error(err);
        }
      });
    }
  }

  // searchProducts() {
  //   this.currentPage=1;
  //   this.totalPages=0;
  //   console.log('Searching for:', this.keyword); // Log the keyword
  //   this.productService.searchProducts(this.keyword,this.currentPage,this.pageSize).subscribe({
  //     next: value => {
  //       console.log('Search results:', value); // Log the search results
  //       this.products = value;
  //     },
  //     error: err => {
  //       console.error('Search error:', err);
  //     }
  //   });
  // }

  handleGotoPage(page: number) {
    this.appState.productsState.currentPage=page;
    this.getProducts();
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
