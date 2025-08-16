import { create } from 'zustand';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (id: number, size: string, color: string) => void;
  updateQuantity: (id: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (product, size, color) => {
    console.log('Adding item to cart:', product.name, size, color);
    set((state) => {
      const existingItem = state.items.find(
        item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === product.id && item.selectedSize === size && item.selectedColor === color
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          items: [...state.items, { ...product, quantity: 1, selectedSize: size, selectedColor: color }]
        };
      }
    });
  },
  
  removeItem: (id, size, color) => {
    console.log('Removing item from cart:', id, size, color);
    set((state) => ({
      items: state.items.filter(
        item => !(item.id === id && item.selectedSize === size && item.selectedColor === color)
      )
    }));
  },
  
  updateQuantity: (id, size, color, quantity) => {
    console.log('Updating quantity:', id, size, color, quantity);
    if (quantity <= 0) {
      get().removeItem(id, size, color);
      return;
    }
    
    set((state) => ({
      items: state.items.map(item =>
        item.id === id && item.selectedSize === size && item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    }));
  },
  
  clearCart: () => {
    console.log('Clearing cart');
    set({ items: [] });
  },
  
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
  
  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}));