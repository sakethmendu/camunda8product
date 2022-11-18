import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductServiceService } from '../product.service.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {

  product: Product = new Product;

  constructor(private service: ProductServiceService) { }

  ngOnInit(): void {
  }

  addProduct() {
    this.service.createproduct(this.product).subscribe();
    alert("product added")
    console.log(this.product)
  }

  addProductCamunda() {
    this.service.createCamundaService(this.product).subscribe(data => {this.product = new Product});
    alert("Product submitted")
  }

}
