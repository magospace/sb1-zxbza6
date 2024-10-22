import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Printer, Download, Globe, Clipboard, Camera } from 'lucide-react';
import { Button } from './ui/button';
import QRCode from 'react-qr-code';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNotifications } from '../hooks/useNotifications';

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  dateOfBirth: string;
  microchipNumber: string;
  owner: {
    name: string;
    phone: string;
    email: string;
  };
  vetInfo: {
    name: string;
    phone: string;
    email: string;
  };
  vaccinations: {
    name: string;
    date: string;
    nextDueDate: string;
  }[];
}

interface PetPassportProps {
  pet: Pet;
}

const PetPassport: React.FC<PetPassportProps> = ({ pet }) => {
  const passportRef = React.useRef<HTMLDivElement>(null);
  const { addNotification } = useNotifications();
  const [showTravelInfo, setShowTravelInfo] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Pasaporte de Mascota para ${pet.name}`,
        text: `¡Mira el Pasaporte de Mascota de ${pet.name}!`,
        url: window.location.href,
      }).then(() => {
        addNotification('Pasaporte de Mascota compartido exitosamente', 'success');
      }).catch((error) => {
        console.error('Error al compartir:', error);
        addNotification('Error al compartir el Pasaporte de Mascota', 'error');
      });
    } else {
      addNotification('Compartir no está soportado en este dispositivo', 'info');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if (passportRef.current) {
      html2canvas(passportRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${pet.name}_pasaporte.pdf`);
      });
    }
  };

  const handleCopyPassportInfo = () => {
    const passportInfo = `
      Nombre de la Mascota: ${pet.name}
      Especie: ${pet.species}
      Raza: ${pet.breed}
      Fecha de Nacimiento: ${pet.dateOfBirth}
      Número de Microchip: ${pet.microchipNumber}
      Dueño: ${pet.owner.name}
      Contacto del Dueño: ${pet.owner.phone}, ${pet.owner.email}
      Veterinario: ${pet.vetInfo.name}
      Contacto del Veterinario: ${pet.vetInfo.phone}, ${pet.vetInfo.email}
    `;

    navigator.clipboard.writeText(passportInfo).then(() => {
      addNotification('Información del pasaporte copiada al portapapeles', 'success');
    }, (err) => {
      console.error('No se pudo copiar el texto: ', err);
      addNotification('Error al copiar la información del pasaporte', 'error');
    });
  };

  const toggleQRCode = () => {
    setShowQRCode(!showQRCode);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Pasaporte de Mascota</h2>
        <div className="space-x-2">
          <Button onClick={handleShare} variant="outline">
            <Share2 className="mr-2" size={16} />
            Compartir
          </Button>
          <Button onClick={handlePrint} variant="outline">
            <Printer className="mr-2" size={16} />
            Imprimir
          </Button>
          <Button onClick={handleDownload} variant="outline">
            <Download className="mr-2" size={16} />
            Descargar
          </Button>
          <Button onClick={handleCopyPassportInfo} variant="outline">
            <Clipboard className="mr-2" size={16} />
            Copiar Info
          </Button>
          <Button onClick={toggleQRCode} variant="outline">
            <Camera className="mr-2" size={16} />
            {showQRCode ? 'Ocultar QR' : 'Mostrar QR'}
          </Button>
        </div>
      </div>

      <div ref={passportRef} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Información de la Mascota</h3>
            <p><strong>Nombre:</strong> {pet.name}</p>
            <p><strong>Especie:</strong> {pet.species}</p>
            <p><strong>Raza:</strong> {pet.breed}</p>
            <p><strong>Fecha de Nacimiento:</strong> {pet.dateOfBirth}</p>
            <p><strong>Número de Microchip:</strong> {pet.microchipNumber}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Información del Dueño</h3>
            <p><strong>Nombre:</strong> {pet.owner.name}</p>
            <p><strong>Teléfono:</strong> {pet.owner.phone}</p>
            <p><strong>Email:</strong> {pet.owner.email}</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Información del Veterinario</h3>
          <p><strong>Nombre:</strong> {pet.vetInfo.name}</p>
          <p><strong>Teléfono:</strong> {pet.vetInfo.phone}</p>
          <p><strong>Email:</strong> {pet.vetInfo.email}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Vacunas</h3>
          <ul className="list-disc list-inside">
            {pet.vaccinations.map((vaccination, index) => (
              <li key={index}>
                {vaccination.name} - Fecha: {vaccination.date}, Próxima Dosis: {vaccination.nextDueDate}
              </li>
            ))}
          </ul>
        </div>

        <AnimatePresence>
          {showQRCode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center"
            >
              <QRCode value={window.location.href} size={200} />
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <Button onClick={() => setShowTravelInfo(!showTravelInfo)} variant="outline">
            <Globe className="mr-2" size={16} />
            {showTravelInfo ? 'Ocultar Info de Viaje' : 'Mostrar Info de Viaje'}
          </Button>
          <AnimatePresence>
            {showTravelInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-blue-50 rounded-lg"
              >
                <h4 className="text-lg font-semibold mb-2">Información de Viaje</h4>
                <p>Siempre verifica los requisitos específicos de tu país de destino antes de viajar con tu mascota.</p>
                <ul className="list-disc list-inside mt-2">
                  <li>Asegúrate de que todas las vacunas estén al día</li>
                  <li>Lleva una copia del certificado de salud de tu mascota</li>
                  <li>Verifica las políticas específicas de la aerolínea para viajar con mascotas</li>
                  <li>Considera contratar un seguro de viaje para mascotas en viajes internacionales</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default PetPassport;