import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, products } from '../products';
import { CartService } from '../cart.service';
import { Store } from '@ngrx/store';
import { addProduct } from '../ngrx-store/cart-actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  //union , it means that product can be eiher a Produc object or undefined
  /*product: interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}
*/
  product: Product | undefined;

  // injecting dependency/service in order to use them.
  constructor(
    private route: ActivatedRoute,
    private cartSevice: CartService,
    private store: Store
  ) {}

  //
  ngOnInit() {
    //retrieving the product id that is passed in as URL parameters
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('productId'));

    //find the product that correspond with the id provided in route
    this.product = products.find(
      (product) => product.id === productIdFromRoute
    );

    //checking the product using browser window
    console.log(this.product);
  }

  // adding the add to cart method to add item to cart
  //the product object will be added into the item array defined in the cart services
  // will be triggered by a button click
  addToCart(product: Product) {
    this.cartSevice.addToCart(product);
    window.alert('Your product have been added into the cart');
  }

  //using ngrx store================
  //testing ngrx
  addItemToCart(product: Product) {
    //check the price
    //console.warn(product.price);
    this.store.dispatch(addProduct(product));
    window.alert('Your product have been added into the cart');
  }
}
