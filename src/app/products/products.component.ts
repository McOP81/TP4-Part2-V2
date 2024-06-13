import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{
  products :Array<any> =[
    // {id : 1, name : "Computer", price : 4500, checked : false},
    // {id : 2, name : "Printer", price : 4500, checked : true},
    // {id : 3, name : "Phone", price : 4500, checked : false}
  ];
  constructor(private http:HttpClient) {
  }
  ngOnInit() {
   this.getProducts();
  }

  getProducts(){
    this.http.get<Array<any>>("http://localhost:8089/products")
      .subscribe({
        next : data =>{
          this.products=data
        },
        error : err =>{}
      })
  }



  handleCheckProduct(product: any) {
    this.http.patch<any>(`http://localhost:8089/products/${product.id}`,
      {checked:!product.checked}).subscribe({
      next : updateProduct => {
        product.checked=!product.checked;
        // this.getProducts();
          }
        })
      }
}
