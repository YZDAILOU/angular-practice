import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  addProduct,
  clearCart,
  removeProduct,
} from '../ngrx-store/cart-actions';
import { Observable } from 'rxjs';
import {
  selectCountProducts,
  selectTotalPrice,
  ProductGroup,
  selectGroupCartEntries,
} from '../ngrx-store/cart.selector';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  //observable
  countProducts$: Observable<number>;
  totalPrice$: Observable<number>;
  cartEntries$: Observable<ProductGroup[]>;
  //inject the cart service into the constructor so we can use this service with "this.cartService"
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private store: Store
  ) {
    this.countProducts$ = store.select(selectCountProducts);
    this.totalPrice$ = store.select(selectTotalPrice);
    this.cartEntries$ = store.select(selectGroupCartEntries);
  }

  ngOnInit() {}

  //defining the items property to store the products in the cart.
  items = this.cartService.getItems();

  //form builder group() method to gather the user's name and address
  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
  });

  //onSubmit event listener, triggered by the form button.
  onSubmit(): void {
    //process checkout data here
    this.items = this.cartService.clearCart();
    //print the form detail on console
    console.warn(
      'Your form have been submitted successfully',
      this.checkoutForm.value
      //^ the "this.checkoutForm.value return everything in the form"
    );
    this.checkoutForm.reset();
  }

  //clear cart
  clearEntries() {
    //dispatch the clear cart action
    this.store.dispatch(clearCart());
  }

  //more
  more(entry: any) {
    this.store.dispatch(addProduct(entry.product));
  }

  //less
  less(entry: any) {
    this.store.dispatch(removeProduct(entry.product));
  }
}
