// ProductsCart.tsx
'use client'

import { useReducer } from "react";
import { productsInitialState, productsReducer } from "@/reducers/shoppingCartReducer";
import ShoppingProductCart from "./ShoppingProductCart";
import TYPES from "@/reducers/actionsTypes";

const ProductsCart = () => {
  const [state, dispatch] = useReducer(productsReducer, productsInitialState);

  const deleteFromCart = (id: string | number) => {
    dispatch({
      type: TYPES.REMOVE_FROM_CART,
      payload: id,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products Cart</h1>
      {state.cart.map((productCart: any) => (
        <ShoppingProductCart 
          key={productCart.id} 
          data={productCart} 
          deleteFromCart={deleteFromCart}
        />
      ))}
    </div>
  );
};

export default ProductsCart;