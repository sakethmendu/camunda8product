import { Component, OnInit } from '@angular/core';
import { Product } from '../Product';
import { ProductServiceService } from '../product.service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private service: ProductServiceService) { }

  Products: Product[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.service.getProducts().subscribe((data: any) => {
      console.log(data)
      this.Products = data;
    }
    )
    }

}
