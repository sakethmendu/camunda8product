import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  baseurl = "http://localhost:8088/product-app";

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(`${this.baseurl}/products`);
  }

  deleteProduct(id) {
    return this.http.delete(`${this.baseurl}/product/${id}`, id)
  }

  getProduct(id) {
    return this.http.get(`${this.baseurl}/product/${id}`);
  }

  createproduct(product: Product) {
    return this.http.post(`${this.baseurl}/product`, product);
  }

  updateProduct(product: Product, id: any) {
    return this.http.patch(`${this.baseurl}/product/${id}/`, product);
  }

  createCamundaService(body: any) {
    return this.http.post(`http://localhost:8080/zeebe/startprocess/product_created`, body);
  }

}
