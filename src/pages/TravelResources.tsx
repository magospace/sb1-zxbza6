import React from 'react';
import { Download } from 'lucide-react';

const TravelResources: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Viajar con tu Mascota</h1>
        <h2 className="text-2xl text-center mb-12">Guías de Aerolíneas y Requisitos Internacionales</h2>

        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <p className="text-lg mb-6">
            Viajar con mascotas implica conocer los requisitos de las aerolíneas y los destinos internacionales. En BienPet, te proporcionamos toda la información que necesitas para viajar con tu perro o gato sin estrés.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Regulaciones de Aerolíneas y Países</h3>
          
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">Requisitos por Aerolínea</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="border p-2">Aerolínea</th>
                    <th className="border p-2">Política de Mascotas</th>
                    <th className="border p-2">Tamaño/Límite de Peso</th>
                    <th className="border p-2">Requisitos Especiales</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">Aeroméxico</td>
                    <td className="border p-2">Mascotas en cabina si son pequeñas (&lt;10 kg)</td>
                    <td className="border p-2">10 kg máximo</td>
                    <td className="border p-2">Certificado de salud, vacuna contra la rabia</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2">Interjet</td>
                    <td className="border p-2">Mascotas pequeñas en cabina, mayores en bodega</td>
                    <td className="border p-2">32 kg máximo en bodega</td>
                    <td className="border p-2">Notificación con 48h de anticipación</td>
                  </tr>
                  <tr>
                    <td className="border p-2">American Airlines</td>
                    <td className="border p-2">Mascotas en cabina en rutas específicas</td>
                    <td className="border p-2">9 kg máximo</td>
                    <td className="border p-2">Certificado de salud emitido en los últimos 10 días</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Requisitos por País</h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="border p-2">Destino</th>
                    <th className="border p-2">Requisitos</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">México</td>
                    <td className="border p-2">Certificado de salud, vacuna contra la rabia</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2">Estados Unidos</td>
                    <td className="border p-2">Certificado de salud emitido dentro de los 10 días previos al viaje</td>
                  </tr>
                  <tr>
                    <td className="border p-2">Canadá</td>
                    <td className="border p-2">Vacuna contra la rabia, microchip, certificado de salud para ciertas provincias</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border p-2">Unión Europea</td>
                    <td className="border p-2">Microchip obligatorio, vacuna contra la rabia, certificado de salud de veterinario</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition duration-300 flex items-center justify-center mx-auto">
            <Download size={20} className="mr-2" />
            Descargar Requisitos para Viajar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TravelResources;