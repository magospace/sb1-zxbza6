import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const menuItems = [
  // ... existing menu items
  {
    name: 'Comunidad',
    items: [
      { name: 'Foro', path: '/forum' },
      { name: 'Gamificación', path: '/gamification' },
    ],
  },
];

// ... rest of the component remains the same