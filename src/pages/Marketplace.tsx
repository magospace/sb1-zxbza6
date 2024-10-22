import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Star, Heart, Filter } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import ShoppingCartModal from '../components/ShoppingCartModal';
import ProductReviews from '../components/ProductReviews';
import ProductRecommendations from '../components/ProductRecommendations';
import MarketplaceItemSkeleton from '../components/MarketplaceItemSkeleton';
import { fetchMarketplaceItems } from '../api/marketplaceApi';
import { useNotifications } from '../hooks/useNotifications';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  petType: string;
  rating: number;
}

const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPetType, setSelectedPetType] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('');
  const [cart, setCart] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { addNotification } = useNotifications();

  const { data: products, isLoading, error } = useQuery('marketplaceItems', fetchMarketplaceItems, {
    onError: () => {
      addNotification('Error al cargar los productos', 'error');
    },
  });

  const filteredProducts = products?.filter((product: Product) => {
    return (
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || product.category === selectedCategory) &&
      (selectedPetType === '' || product.petType === selectedPetType) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
  }) || [];

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    addNotification(`${product.name} agregado al carrito`, 'success');
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <MarketplaceItemSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error al cargar los productos</div>;
  }

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Marketplace</h1>
        
        <div className="mb-8 flex flex-wrap gap-4">
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full md:w-auto"
          >
            <option value="">Todas las categorías</option>
            <option value="food">Comida</option>
            <option value="toys">Juguetes</option>
            <option value="accessories">Accesorios</option>
          </Select>
          <Select
            value={selectedPetType}
            onChange={(e) => setSelectedPetType(e.target.value)}
            className="w-full md:w-auto"
          >
            <option value="">Todos los tipos de mascota</option>
            <option value="dog">Perros</option>
            <option value="cat">Gatos</option>
            <option value="bird">Aves</option>
          </Select>
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-auto"
          >
            <option value="">Ordenar por</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="rating">Mejor Valorados</option>
          </Select>
        </div>

        <div className="mb-8">
          <label className="block mb-2">Rango de Precio</label>
          <Slider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
          />
          <div className="flex justify-between mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {sortedProducts.map(product => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                      <div className="flex items-center">
                        <Star className="text-yellow-400 fill-current" />
                        <span className="ml-1">{product.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Button onClick={() => addToCart(product)}>
                        <ShoppingCart size={20} className="mr-2" />
                        Agregar al Carrito
                      </Button>
                      <Button variant="outline" onClick={() => setSelectedProduct(product)}>
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {sortedProducts.length === 0 && (
          <p className="text-center text-gray-600 mt-8">No se encontraron productos que coincidan con los criterios de búsqueda.</p>
        )}

        <Button
          className="fixed bottom-4 right-4 z-10"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart size={20} className="mr-2" />
          Carrito ({cart.length})
        </Button>

        <ShoppingCartModal
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          setCart={setCart}
        />

        {selectedProduct && (
          <ProductReviews
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={() => addToCart(selectedProduct)}
          />
        )}
      </div>
    </AnimatedPage>
  );
};

export default Marketplace;