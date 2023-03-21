import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  //inject the cart service into the constructor so we can use this service with "this.cartService"
  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

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
}
