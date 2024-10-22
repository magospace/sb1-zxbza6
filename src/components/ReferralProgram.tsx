import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const ReferralProgram: React.FC = () => {
  const [referralCode] = useState('INVITA10');

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    // You can add a notification here to inform the user that the code has been copied
  };

  const shareReferralCode = () => {
    // Implement sharing functionality (e.g., open a share dialog)
    console.log('Sharing referral code');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Programa de Referidos
      </motion.h1>
      <p className="text-lg mb-8">
        Invita a tus amigos a unirse a BienPet y ambos ganarán puntos adicionales. ¡Es fácil y beneficioso para todos!
      </p>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Tu Código de Referido</h2>
        <div className="flex items-center mb-4">
          <Input value={referralCode} readOnly className="mr-2" />
          <Button onClick={copyReferralCode}>
            <Copy size={20} className="mr-2" />
            Copiar
          </Button>
        </div>
        <Button onClick={shareReferralCode} variant="outline">
          <Share2 size={20} className="mr-2" />
          Compartir Código
        </Button>
      </div>
      <div className="bg-green-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Beneficios del Programa</h2>
        <div className="mb-4">
          <h3 className="font-semibold">Para Ti:</h3>
          <p>Gana 300 puntos por cada referido exitoso</p>
        </div>
        <div>
          <h3 className="font-semibold">Para tu Amigo:</h3>
          <p>Gana 100 puntos al unirse</p>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgram;