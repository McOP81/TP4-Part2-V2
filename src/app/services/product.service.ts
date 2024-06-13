import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  public getProducts():Observable<any>{
    return this.http.get<Array<any>>("http://localhost:8089/products");
  }
  public checkProduct(product:any):Observable<any>{
    return this.http.patch<any>(`http://localhost:8089/products/${product.id}`,
      {checked:!product.checked});
  }
}
