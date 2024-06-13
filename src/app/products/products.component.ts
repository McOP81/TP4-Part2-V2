import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products :Array<any> =[
    {id : 1, name : "Computer", price : 4500, checked : false},
    {id : 2, name : "Printer", price : 4500, checked : true},
    {id : 3, name : "Phone", price : 4500, checked : false}
  ]

  handleCheckProduct(product: any) {
    product.checked=!product.checked;
  }
}
