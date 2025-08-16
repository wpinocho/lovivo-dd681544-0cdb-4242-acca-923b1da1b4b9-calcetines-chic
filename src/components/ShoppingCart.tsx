import React from 'react';
import { useCartStore } from '../store/cartStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

const ShoppingCart: React.FC = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalItems, getTotalPrice } = useCartStore();

  console.log('Rendering ShoppingCart with items:', items.length);

  const handleQuantityChange = (id: number, size: string, color: string, newQuantity: number) => {
    updateQuantity(id, size, color, newQuantity);
  };

  const handleRemoveItem = (id: number, size: string, color: string, name: string) => {
    removeItem(id, size, color);
    toast.success(`${name} eliminado del carrito`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Carrito vaciado');
  };

  const handleCheckout = () => {
    toast.success('¡Gracias por tu compra! (Demo)');
    clearCart();
  };

  if (items.length === 0) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Carrito de Compras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500 py-8">Tu carrito está vacío</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Carrito de Compras
          </span>
          <Badge variant="secondary">{getTotalItems()} items</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-96 overflow-y-auto space-y-3">
          {items.map((item) => (
            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-center gap-3 p-3 border rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{item.name}</h4>
                <p className="text-xs text-gray-500">
                  {item.selectedSize} - {item.selectedColor}
                </p>
                <p className="font-semibold text-sm">€{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuantityChange(item.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                  className="w-8 h-8 p-0"
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleQuantityChange(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                  className="w-8 h-8 p-0"
                >
                  <Plus className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemoveItem(item.id, item.selectedSize, item.selectedColor, item.name)}
                  className="w-8 h-8 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t pt-4 space-y-3">
          <div className="flex justify-between items-center font-semibold text-lg">
            <span>Total:</span>
            <span>€{getTotalPrice().toFixed(2)}</span>
          </div>
          
          <div className="space-y-2">
            <Button onClick={handleCheckout} className="w-full">
              Finalizar Compra
            </Button>
            <Button onClick={handleClearCart} variant="outline" className="w-full">
              Vaciar Carrito
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShoppingCart;