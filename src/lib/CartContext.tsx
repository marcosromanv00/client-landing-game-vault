'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Game } from './data';

interface CartItem extends Game {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addItem: (product: Game) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const initCart = () => {
      const savedCart = localStorage.getItem('gv-cart');
      if (savedCart) {
        try {
          const parsed = JSON.parse(savedCart);
          if (Array.isArray(parsed)) {
            setCart(parsed);
          }
        } catch (e) {
          console.error('Error parsing cart from localStorage', e);
        }
      }
      setIsInitialized(true);
    };
    initCart();
  }, []);

  // Save cart to localStorage on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('gv-cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  const addItem = (product: Game) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.slug === product.slug);
      if (existingItem) {
        return prevCart.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (slug: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.slug !== slug));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
