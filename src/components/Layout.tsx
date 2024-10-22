import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import BackToTop from './BackToTop';
import LoadingSpinner from './LoadingSpinner';
import Breadcrumbs from './Breadcrumbs';
import SkipLink from './SkipLink';
import ChatBot from './ChatBot';
import NotificationSystem from './NotificationSystem';
import { useNotifications } from '../hooks/useNotifications';
import AnimatedTransition from './AnimatedTransition';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { notifications, removeNotification } = useNotifications();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <SkipLink />
      <Header onOpenSearch={() => setIsSearchOpen(true)} />
      <Breadcrumbs />
      <main id="main-content" className="flex-grow">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingSpinner key="spinner" />
          ) : (
            <AnimatedTransition key={location.pathname}>
              {children}
            </AnimatedTransition>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <Search isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AnimatePresence>
        {showBackToTop && <BackToTop />}
      </AnimatePresence>
      <ChatBot />
      <NotificationSystem notifications={notifications} removeNotification={removeNotification} />
    </div>
  );
};

export default Layout;