import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Button } from './ui/button';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

interface ProductRecommendationsProps {
  products: Product[];
  currentProduct: Product;
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ products, currentProduct }) => {
  const recommendations = products
    .filter(product => product.id !== currentProduct.id && product.category === currentProduct.category)
    .slice(0, 3);

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Productos Recomendados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map(product => (
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">${product.price.toFixed(2)}</span>
                <Button>Ver Producto</Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductRecommendations;