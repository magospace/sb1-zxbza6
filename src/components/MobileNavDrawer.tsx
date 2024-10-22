import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const menuItems = [
  // ... existing menu items
  { name: 'Foro', path: '/forum' },
  { name: 'Gamificación', path: '/gamification' },
];

// ... rest of the component remains the same