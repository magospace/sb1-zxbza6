import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, WhatsApp, Linkedin, Mail, Link } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { useNotifications } from '../hooks/useNotifications';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title, description }) => {
  const [shareCount, setShareCount] = useState(0);
  const [shortenedUrl, setShortenedUrl] = useState('');
  const { addNotification } = useNotifications();

  useEffect(() => {
    fetchShareCount();
    shortenUrl();
  }, [url]);

  const fetchShareCount = async () => {
    // Simulated API call to fetch share count
    const count = Math.floor(Math.random() * 100);
    setShareCount(count);
  };

  const shortenUrl = async () => {
    // Simulated API call to shorten URL
    const shortened = `https://short.url/${Math.random().toString(36).substr(2, 5)}`;
    setShortenedUrl(shortened);
  };

  const encodedUrl = encodeURIComponent(shortenedUrl || url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareButtons = [
    {
      name: 'Facebook',
      icon: <Facebook size={16} />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Twitter',
      icon: <Twitter size={16} />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-sky-500 hover:bg-sky-600',
    },
    {
      name: 'WhatsApp',
      icon: <WhatsApp size={16} />,
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={16} />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      color: 'bg-blue-700 hover:bg-blue-800',
    },
    {
      name: 'Email',
      icon: <Mail size={16} />,
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl || url);
    addNotification('URL copiada al portapapeles', 'success');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {shareButtons.map((button, index) => (
          <motion.div
            key={button.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button
              variant="default"
              size="sm"
              className={`${button.color} text-white`}
              onClick={() => window.open(button.url, '_blank')}
            >
              {button.icon}
              <span className="ml-2 hidden sm:inline">{button.name}</span>
            </Button>
          </motion.div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={shortenedUrl || url}
          readOnly
          className="flex-grow px-3 py-2 border rounded-md"
        />
        <Button onClick={copyToClipboard}>
          <Link size={16} className="mr-2" />
          Copiar
        </Button>
      </div>
      <p className="text-sm text-gray-600">Compartido {shareCount} veces</p>
    </div>
  );
};

export default SocialShare;