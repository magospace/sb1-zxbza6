import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import LazyImage from './LazyImage';

interface Photo {
  id: string;
  url: string;
  caption: string;
}

interface PetPhotoGalleryProps {
  photos: Photo[];
  petName: string;
}

const PetPhotoGallery: React.FC<PetPhotoGalleryProps> = ({ photos, petName }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const openLightbox = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto?.id);
    let newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex < 0) newIndex = photos.length - 1;
    if (newIndex >= photos.length) newIndex = 0;

    setSelectedPhoto(photos[newIndex]);
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4">Galería de Fotos de {petName}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            className="relative cursor-pointer overflow-hidden rounded-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openLightbox(photo)}
          >
            <LazyImage
              src={photo.url}
              alt={`${petName} - ${photo.caption}`}
              className="w-full h-48 object-cover"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={closeLightbox}
          >
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <LazyImage
                src={selectedPhoto.url}
                alt={`${petName} - ${selectedPhoto.caption}`}
                className="w-full"
              />
              <p className="text-white text-center mt-4">{selectedPhoto.caption}</p>
              <button
                className="absolute top-4 right-4 text-white"
                onClick={closeLightbox}
                aria-label="Cerrar galería de fotos"
              >
                <X size={24} />
              </button>
              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
                onClick={() => navigatePhoto('prev')}
                aria-label="Foto anterior"
              >
                <ChevronLeft size={36} />
              </button>
              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
                onClick={() => navigatePhoto('next')}
                aria-label="Siguiente foto"
              >
                <ChevronRight size={36} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PetPhotoGallery;