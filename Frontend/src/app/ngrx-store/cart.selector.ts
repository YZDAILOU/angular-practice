//getting the current state using selector.
import { Product } from '../products';
import { createFeatureSelector, createSelector } from '@ngrx/store';

//define the interface for the productGroup
export interface ProductGroup {
  product: Product;
  count: number;
}

//get the number of item in the cart
export const selectCountProducts = createSelector(
  createFeatureSelector('cartEntries'),
  (state: Product[]) => {
    return state.length;
  }
);

//get the total price of the cart
//using the forEach() function , loop through all the product in the array and add the price together.
export const selectTotalPrice = createSelector(
  createFeatureSelector('cartEntries'),
  (state: Product[]) => {
    var totalPrice = 0;
    state.forEach((p) => (totalPrice += p.price));
    return totalPrice;
  }
);

// grouping products by id and at the same time counting them
export const selectGroupCartEntries = createSelector(
  createFeatureSelector('cartEntries'),
  (state: Product[]) => {
    var map: Map<number, ProductGroup> = new Map();

    state.forEach((p) => {
      if (map.get(p.id)) {
        (map.get(p.id) as ProductGroup).count++;
      } else {
        map.set(p.id, { product: p, count: 1 });
      }
    });

    const sortedMap = new Map([...map.entries()].sort());
    return Array.from(sortedMap.values());
  }
);
