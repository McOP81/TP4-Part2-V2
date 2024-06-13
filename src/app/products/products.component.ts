// products.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = [];
  public keyword: string = "";
  totalPages:number=0;
  pageSize:number=3;
  currentPage:number=1;

  constructor(private productService: ProductService,private router : Router) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.keyword,this.currentPage,this.pageSize).subscribe({
      next: (resp) => {
        this.products=resp.body as Product[];
        let totalProducts:number=parseInt(resp.headers.get('X-Total-Count')!);
        this.totalPages = Math.floor(totalProducts / this.pageSize);
        // this.totalPages = Math.ceil(totalProducts / this.pageSize);
        if(totalProducts % this.pageSize !=0){
          this.totalPages=this.totalPages+1;
        }
        console.log("totalPages",this.totalPages);
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
    this.currentPage=page;
    this.getProducts();
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
