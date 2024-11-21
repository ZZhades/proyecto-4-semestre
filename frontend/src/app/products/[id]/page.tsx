"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProduct } from "../products.api";
import { useReducer, useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from '@/components/ui/button';
import { productsInitialState, productsReducer } from "@/reducers/shoppingCartReducer";
import TYPES from "@/reducers/actionsTypes";

interface Props {
    params: {
        id: string;
    };
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

function ProductDetailPage({ params }: Props) {
    const [state, dispatch] = useReducer(productsReducer, productsInitialState);
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const data = await getProduct(params.id);
                setProduct(data);
            } catch (err) {
                setError('Failed to load product details');
                console.error('Error fetching product:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    const addToCart = (id: string) => {
        console.log('Adding to cart:', id);
        dispatch({
            type: TYPES.ADD_TO_CART,
            payload: id,
        });
    };

    const clearCart = () => {
        dispatch({
            type: TYPES.CLEAR_CART,
        });
    };

    const calculateTotalPriceCart = () => {
        dispatch({
            type: TYPES.CALCULATE_TOTAL_PRICE_CART,
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Card className="w-full max-w-md">
                    <CardContent className="p-6">
                        <div className="animate-pulse space-y-4">
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-64 bg-gray-200 rounded"></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Card className="w-full max-w-md">
                    <CardContent className="p-6">
                        <div className="text-red-500 text-center">
                            <h2 className="text-xl font-bold">Error</h2>
                            <p>{error}</p>
                            <Link
                                className={buttonVariants({ className: "mt-4" })}
                                href="/"
                            >
                                Return to Home
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!product) {
        return null;
    }

    return (
        <div className="flex justify-center items-center min-h-screen p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                        <span>Product Detail: {product.id}</span>
                        <Link
                            className={buttonVariants()}
                            href="/"
                        >
                            Go back
                        </Link>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <h1 className="text-2xl font-bold">{product.name}</h1>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-xl font-semibold">${product.price}</p>
                    <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-64 object-cover rounded-md"
                    />
                    <button
                        type="button"
                        onClick={() => addToCart(product.id)}
                        className={buttonVariants({ className: "w-full mt-4" })}
                    >
                        Add to Cart
                    </button>
                </CardContent>
            </Card>
        </div>
    );
}

export default ProductDetailPage;