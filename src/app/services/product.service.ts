import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private  host:string="http://localhost:8089";

  constructor(private http:HttpClient) { }

  public getProducts():Observable<Array<Product>>{
    return this.http.get<Array<Product>>(`${this.host}/products`);
  }
  public checkProduct(product:Product):Observable<Product>{
    return this.http.patch<Product>(`${this.host}/products/${product.id}`,
      {checked:!product.checked});
  }
  public deleteProduct(product:Product){
    return this.http.delete<any>(`${this.host}/products/${product.id}`);
  }
  public saveProduct(product: Product):Observable<Product> {
    return this.http.post<Product>(`${this.host}/products`,
      product);
  }
}
