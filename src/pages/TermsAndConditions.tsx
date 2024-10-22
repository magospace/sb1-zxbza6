import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Términos y Condiciones</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">1. Aceptación de los Términos</h2>
          <p className="mb-6">
            Al utilizar los servicios de BienPet, usted acepta cumplir con estos términos y condiciones. Si no está de acuerdo con alguna parte de los términos, no podrá utilizar nuestros servicios.
          </p>

          <h2 className="text-2xl font-bold mb-4">2. Cambios en los Términos</h2>
          <p className="mb-6">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web.
          </p>

          <h2 className="text-2xl font-bold mb-4">3. Privacidad</h2>
          <p className="mb-6">
            Su uso de BienPet también está regido por nuestra Política de Privacidad, que puede encontrar en el enlace correspondiente.
          </p>

          <h2 className="text-2xl font-bold mb-4">4. Servicios de BienPet</h2>
          <p className="mb-6">
            BienPet ofrece planes de salud para mascotas y servicios relacionados. Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento.
          </p>

          <h2 className="text-2xl font-bold mb-4">5. Responsabilidades del Usuario</h2>
          <p className="mb-6">
            Usted es responsable de mantener la confidencialidad de su cuenta y contraseña. Debe notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta.
          </p>

          <h2 className="text-2xl font-bold mb-4">6. Limitación de Responsabilidad</h2>
          <p className="mb-6">
            BienPet no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos, o cualquier pérdida de beneficios o ingresos.
          </p>

          <p className="mt-8 text-sm text-gray-600">
            Última actualización: 1 de Julio, 2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;