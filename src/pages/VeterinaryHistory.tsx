import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Syringe, Stethoscope, Pill } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedPage from '../components/AnimatedPage';

// ... (keep the existing interfaces)

const VeterinaryHistory: React.FC = () => {
  // ... (keep the existing state and functions)

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Historial Veterinario</h1>
        <Tabs defaultValue={selectedPet.id.toString()} onValueChange={(value) => setSelectedPet(pets.find(pet => pet.id.toString() === value) as Pet)}>
          <TabsList>
            {pets.map(pet => (
              <TabsTrigger key={pet.id} value={pet.id.toString()}>{pet.name}</TabsTrigger>
            ))}
          </TabsList>
          {pets.map(pet => (
            <TabsContent key={pet.id} value={pet.id.toString()}>
              <div className="mb-4">
                <Button onClick={() => setIsAddRecordOpen(true)}>Agregar Registro Médico</Button>
              </div>
              {pet.records.length === 0 ? (
                <p>No hay registros médicos para {pet.name}.</p>
              ) : (
                <AnimatePresence>
                  <motion.ul className="space-y-4">
                    {pet.records.map(record => (
                      <motion.li
                        key={record.id}
                        className="bg-white p-4 rounded-lg shadow"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="flex items-center mb-2">
                          {record.type === 'vaccine' && <Syringe className="mr-2 text-blue-500" />}
                          {record.type === 'checkup' && <Stethoscope className="mr-2 text-green-500" />}
                          {record.type === 'medication' && <Pill className="mr-2 text-red-500" />}
                          <span className="font-semibold">{record.date}</span>
                        </div>
                        <p>{record.description}</p>
                      </motion.li>
                    ))}
                  </motion.ul>
                </AnimatePresence>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* ... (keep the existing Dialog for adding records) */}
      </div>
    </AnimatedPage>
  );
};

export default VeterinaryHistory;