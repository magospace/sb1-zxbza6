import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: Review[];
}

interface ProductReviewsProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ product, isOpen, onClose, onAddToCart }) => {
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

  const handleAddReview = () => {
    // Implement logic to add a new review
    console.log('New review:', newReview);
    // Reset the form
    setNewReview({ rating: 0, comment: '' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-4" />
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-green-600 mr-4">${product.price.toFixed(2)}</span>
              <Button onClick={onAddToCart} className="bg-green-600 hover:bg-green-700">
                <ShoppingCart size={20} className="mr-2" />
                Agregar al Carrito
              </Button>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Reseñas</h3>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                  />
                ))}
                <span className="ml-2">({product.reviews.length} reseñas)</span>
              </div>
              {product.reviews.map(review => (
                <div key={review.id} className="border-t py-4">
                  <div className="flex items-center mb-2">
                    <span className="font-semibold mr-2">{review.user}</span>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Agregar Reseña</h3>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={i < newReview.rating ? "text-yellow-400 fill-current cursor-pointer" : "text-gray-300 cursor-pointer"}
                    onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                  />
                ))}
              </div>
              <Textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Escribe tu reseña aquí..."
                className="mb-2"
              />
              <Button onClick={handleAddReview}>Enviar Reseña</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductReviews;