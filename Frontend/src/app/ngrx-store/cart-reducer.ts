import { Product } from '../products';
import { ActionReducer, createReducer, INIT, on, UPDATE } from '@ngrx/store';
import { addProduct, removeProduct, clearCart } from './cart-actions';

//we want to keep track of the product array
export const initialCartEntries: Product[] = [];

export const cartReducer = createReducer(
  initialCartEntries,
  //For all action we define , we need to define State transitional instruction using the on function
  //clearCart action , we will replace the array with empty array.
  on(clearCart, (_) => []),

  //addProduct action, we will push the product into the array.
  on(addProduct, (entries, product) => {
    const entriesClone: Product[] = JSON.parse(JSON.stringify(entries));
    console.warn(product);
    entriesClone.push(product);
    return entriesClone;
  }),

  //removeProduct action, find for the product in the array , if found , remove the item.
  on(removeProduct, (entries, product) => {
    const entriesClone: Product[] = JSON.parse(JSON.stringify(entries));
    const found = entriesClone.find((e) => e.id == product.id);
    if (found) {
      entriesClone.splice(entriesClone.indexOf(found, 1));
    }
    return entriesClone;
  })
);

//add metareducer to add and retrieve item from the localstorage.
export const metaReducerLocalStorage = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    //check the action type
    console.warn('Action Type: ' + action.type);
    //check what time of action it is and respond accordingly
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem('state');
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem('state');
        }
      }
    }

    //reading from the localstorage
    const nextState = reducer(state, action);
    localStorage.setItem('state', JSON.stringify(nextState));
    return nextState;
  };
};
