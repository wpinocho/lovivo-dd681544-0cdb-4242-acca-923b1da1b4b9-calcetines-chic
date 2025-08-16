import React from 'react';
import { sockProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';
import StoreHeader from '../components/StoreHeader';

const Index = () => {
  console.log('Rendering Index page with', sockProducts.length, 'products');

  return (
    <div className="min-h-screen bg-gray-50">
      <StoreHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Nuestra Colección</h2>
              <p className="text-gray-600">Descubre los mejores calcetines para cada ocasión</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sockProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
          
          {/* Shopping Cart Sidebar */}
          <div className="lg:w-80">
            <div className="sticky top-24">
              <ShoppingCart />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-lg font-semibold mb-2">SockShop</h3>
          <p className="text-gray-400">Los mejores calcetines para tus pies</p>
          <p className="text-gray-500 text-sm mt-4">© 2024 SockShop. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;