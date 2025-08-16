import React, { useState } from 'react';
import { Product, useCartStore } from '../store/cartStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const addItem = useCartStore((state) => state.addItem);

  console.log('Rendering ProductCard for:', product.name);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Por favor selecciona talla y color');
      return;
    }

    addItem(product, selectedSize, selectedColor);
    toast.success(`${product.name} añadido al carrito`);
    console.log('Product added to cart:', product.name, selectedSize, selectedColor);
  };

  return (
    <Card className="w-full max-w-sm mx-auto hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="aspect-square overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2">{product.name}</CardTitle>
        <CardDescription className="text-sm text-gray-600 mb-3">
          {product.description}
        </CardDescription>
        <div className="text-2xl font-bold text-primary mb-4">
          €{product.price.toFixed(2)}
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium mb-1 block">Talla:</label>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona talla" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Color:</label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona color" />
              </SelectTrigger>
              <SelectContent>
                {product.colors.map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full"
          disabled={!selectedSize || !selectedColor}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Añadir al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;