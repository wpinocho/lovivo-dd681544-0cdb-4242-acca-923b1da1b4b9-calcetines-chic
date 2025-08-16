import React from 'react';
import { useCartStore } from '../store/cartStore';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag } from 'lucide-react';

const StoreHeader: React.FC = () => {
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();

  console.log('Rendering StoreHeader with total items:', totalItems);

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">SockShop</h1>
            <span className="ml-2 text-sm text-gray-500">Tu tienda de calcetines favorita</span>
          </div>
          
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-gray-600" />
            {totalItems > 0 && (
              <Badge variant="destructive" className="min-w-[20px] h-5 flex items-center justify-center text-xs">
                {totalItems}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;