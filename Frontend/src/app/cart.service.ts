import { Injectable } from '@angular/core';
import { Product } from './products';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  //constructor
  constructor(private http: HttpClient) {}
  //items is an array of product object.
  items: Product[] = [];

  //adding a product object into the item array
  addToCart(product: Product) {
    this.items.push(product);
  }

  //get item
  getItems() {
    return this.items;
  }

  //clear cart
  clearCart() {
    this.items = [];
    return this.items;
  }

  //getting the shipping data from the shipping.json using the httpClient get() method
  getShippingPrices() {
    return this.http.get<{ type: string; price: number }[]>(
      '/assets/shipping.json'
    );
  }
}
