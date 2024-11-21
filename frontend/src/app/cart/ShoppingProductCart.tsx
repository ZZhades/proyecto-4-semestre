"use client"
import React, { useReducer } from 'react';
import { productsReducer, productsInitialState } from '@/reducers/shoppingCartReducer';
import { Card, CardContent } from "@/components/ui/card";

interface ProductData {
  id: string | number;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity?: number;
}

interface ShoppingProductCartProps {
  data: ProductData;
  removeFromCart?: () => void;
  deleteFromCart: (id: string | number) => void;
}

const ShoppingProductCart: React.FC<ShoppingProductCartProps> = ({ 
  data, 
  removeFromCart, 
  deleteFromCart 
}) => {

    console.log(data)
    const [state, dispatch] = useReducer(productsReducer, productsInitialState);

    console.log(state.cart)

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            
            <div className="grid gap-4">
                {state.cart.map((productCart: ProductData) => (
                    <Card key={productCart.id} className="overflow-hidden">
                        <CardContent className="p-4">
                            <div className="flex gap-4">
                                {/* Product Image */}
                                <div className="w-32 h-32 flex-shrink-0">
                                    <img 
                                        src={productCart.image} 
                                        alt={productCart.name}
                                        className="w-full h-full object-cover rounded"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-semibold">
                                                {productCart.name}
                                            </h3>
                                            <p className="text-gray-600 mt-1">
                                                ID: {productCart.id}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xl font-bold">
                                                ${productCart.price.toFixed(2)}
                                            </p>
                                            {productCart.quantity && (
                                                <p className="text-sm text-gray-600">
                                                    Quantity: {productCart.quantity}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mt-2">
                                        {productCart.description}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() => deleteFromCart(productCart.id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                        >
                                            Remove from Cart
                                        </button>
                                        {removeFromCart && (
                                            <button
                                                onClick={removeFromCart}
                                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                                            >
                                                Update Price
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Subtotal for items with quantity */}
                            {productCart.quantity && (
                                <div className="mt-3 text-right border-t pt-2">
                                    <p className="text-gray-600">
                                        Subtotal: ${(productCart.price * productCart.quantity).toFixed(2)}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty Cart Message */}
            {state.cart.length === 0 && (
                <Card>
                    <CardContent className="p-6 text-center text-gray-500">
                        Your shopping cart is empty
                    </CardContent>
                </Card>
            )}

            {/* Cart Total */}
            {state.cart.length > 0 && (
                <Card className="mt-4">
                    <CardContent className="p-4 flex justify-between items-center">
                        <span className="font-semibold">Total Cart Value:</span>
                        <span className="text-xl font-bold">
                            ${state.totalPriceShoppingCart.toFixed(2)}
                        </span>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ShoppingProductCart;