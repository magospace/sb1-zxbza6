import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface NotificationSystemProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={`mb-4 p-4 rounded-lg shadow-lg flex items-center justify-between ${
              notification.type === 'info' ? 'bg-blue-500' :
              notification.type === 'success' ? 'bg-green-500' :
              notification.type === 'warning' ? 'bg-yellow-500' :
              'bg-red-500'
            } text-white`}
          >
            <div className="flex items-center">
              {notification.type === 'info' && <Info size={20} className="mr-2" />}
              {notification.type === 'success' && <CheckCircle size={20} className="mr-2" />}
              {notification.type === 'warning' && <AlertTriangle size={20} className="mr-2" />}
              {notification.type === 'error' && <AlertCircle size={20} className="mr-2" />}
              <p>{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 focus:outline-none"
            >
              <X size={18} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;