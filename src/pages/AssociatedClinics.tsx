import React, { useState, useMemo } from 'react';
import { MapPin, Phone, Clock, Star, Search, Filter, ArrowUpDown, List, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { useQuery, useMutation } from 'react-query';
import { fetchClinics } from '../api/clinicApi';
import { bookAppointment } from '../api/appointmentApi';
import { useNotifications } from '../hooks/useNotifications';
import ClinicCard from '../components/ClinicCard';
import ClinicMap from '../components/ClinicMap';
import ClinicDetailsDialog from '../components/ClinicDetailsDialog';
import { useDispatch } from 'react-redux';
import { addAppointment } from '../store/appointmentSlice';

// ... (keep existing interfaces and imports)

const AssociatedClinics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [sortBy, setSortBy] = useState<'rating' | 'name'>('rating');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const { addNotification } = useNotifications();
  const dispatch = useDispatch();

  const { data: clinics, isLoading, error } = useQuery('clinics', fetchClinics);

  const bookAppointmentMutation = useMutation(
    (data: { clinicId: string; appointmentData: any }) =>
      bookAppointment(data.clinicId, data.appointmentData),
    {
      onSuccess: (data) => {
        addNotification('Cita reservada con éxito', 'success');
        dispatch(addAppointment(data));
        setSelectedClinic(null);
      },
      onError: () => {
        addNotification('Error al reservar la cita', 'error');
      },
    }
  );

  const filteredAndSortedClinics = useMemo(() => {
    if (!clinics) return [];
    return clinics
      .filter(clinic =>
        (clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        clinic.address.toLowerCase().includes(searchTerm.toLowerCase())) &&
        clinic.rating >= ratingFilter
      )
      .sort((a, b) => {
        if (sortBy === 'rating') {
          return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        } else {
          return sortOrder === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
      });
  }, [clinics, searchTerm, ratingFilter, sortBy, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleBookAppointment = (appointmentData: any) => {
    if (selectedClinic) {
      bookAppointmentMutation.mutate({
        clinicId: selectedClinic.id,
        appointmentData,
      });
    }
  };

  if (isLoading) return <div>Cargando clínicas...</div>;
  if (error) return <div>Error al cargar las clínicas</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Clínicas Asociadas</h1>
        <p className="text-lg text-center mb-12">
          Nuestra red de clínicas veterinarias de confianza está lista para cuidar de tu mascota. Todas nuestras clínicas asociadas cumplen con los más altos estándares de calidad y atención.
        </p>

        {/* ... (keep existing filter and sort controls) */}

        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredAndSortedClinics.map((clinic) => (
                <motion.div
                  key={clinic.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ClinicCard clinic={clinic} onSelect={() => setSelectedClinic(clinic)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <ClinicMap
            clinics={filteredAndSortedClinics}
            onSelectClinic={(clinic) => setSelectedClinic(clinic)}
          />
        )}

        {filteredAndSortedClinics.length === 0 && (
          <p className="text-center text-gray-600 mt-8">No se encontraron clínicas que coincidan con tu búsqueda.</p>
        )}

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">¿No ves una clínica cerca de ti?</h2>
          <p className="text-lg mb-6">
            Estamos constantemente expandiendo nuestra red. Contáctanos para sugerir una clínica en tu área.
          </p>
          <Button>
            Sugerir una Clínica
          </Button>
        </div>

        <ClinicDetailsDialog
          clinic={selectedClinic}
          onClose={() => setSelectedClinic(null)}
          onBookAppointment={handleBookAppointment}
        />
      </div>
    </div>
  );
};

export default AssociatedClinics;