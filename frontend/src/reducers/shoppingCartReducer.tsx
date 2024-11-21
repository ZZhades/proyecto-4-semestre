// shoppingCartReducer.ts
import TYPES from "./actionsTypes";

// Define interfaces
export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface ProductsState {
    products: Product[];
    cart: CartItem[];
    totalPriceShoppingCart: number;
}

// Define estado inicial con tipos
export const productsInitialState: ProductsState = {
    products: [], // Ahora TypeScript sabe que esto es Product[]
    cart: [],    // Ahora TypeScript sabe que esto es CartItem[]
    totalPriceShoppingCart: 0
};

export const productsReducer = (state: ProductsState, action: any): ProductsState => {
    switch (action.type) {
        case TYPES.ADD_TO_CART: {
            const productToAdd = state.products.find(
                (product) => product.id === action.payload
            );

            if (!productToAdd) {
                return state;
            }

            const existingCartItem = state.cart.find(
                (item) => item.id === action.payload
            );

            if (existingCartItem) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === action.payload
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }

            return {
                ...state,
                cart: [...state.cart, { ...productToAdd, quantity: 1 }],
            };
        }

        case TYPES.REMOVE_FROM_CART: {
            return {
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload),
            };
        }

        case TYPES.CLEAR_CART: {
            return {
                ...state,
                cart: [],
                totalPriceShoppingCart: 0,
            };
        }

        case TYPES.CALCULATE_TOTAL_PRICE_CART: {
            const total = state.cart.reduce(
                (sum, item) => sum + (item.price * item.quantity),
                0
            );

            return {
                ...state,
                totalPriceShoppingCart: total,
            };
        }

        default:
            return state;
    }
};