import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { DeleteproductComponent } from '../deleteproduct/deleteproduct.component';
import { Product } from '../Product';
import { ProductServiceService } from '../product.service.service';

@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.css']
})
export class ViewComponentComponent implements OnInit {

  constructor(private service: ProductServiceService, private route: ActivatedRoute) { }

  id: string;
  edit: boolean = false;
  loaded: boolean = false;

  product: Product = new Product;

  ngOnInit(): void {
    this.route.url.forEach(a => {
      this.id = (a[1].path)
    })
    this.getProduct()
  }

  getProduct() {
    this.service.getProduct(this.id).subscribe((data: any) => {
      this.product = data
      this.loaded = true
    })
  }

  deleteProduct() {
    this.service.deleteProduct(this.id).subscribe()
    alert('Product deleted')
  }

  editProduct() {
    this.edit = true;
    console.log("Edit")
  }

  updateProduct(id: any) {
    this.service.updateProduct(this.product, id).subscribe();
  }

}
