import React, { useState } from 'react';
import { X, Search as SearchIcon } from 'lucide-react';
import { Dialog } from '@headlessui/react';

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const Search: React.FC<SearchProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching for:', searchQuery);
    // You can add actual search functionality and display results here
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium">Buscar en BienPet</Dialog.Title>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSearch} className="mt-2">
            <div className="relative">
              <input
                type="text"
                className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-10 rounded-full text-sm focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar..."
              />
              <button type="submit" className="absolute right-0 top-0 mt-3 mr-4">
                <SearchIcon size={20} className="text-gray-400 hover:text-gray-500" />
              </button>
            </div>
          </form>
          {/* Add search results display here */}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Search;