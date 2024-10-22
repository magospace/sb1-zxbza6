import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Política de Privacidad</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">1. Información que Recopilamos</h2>
          <p className="mb-6">
            Recopilamos información personal que usted nos proporciona directamente, como nombre, dirección de correo electrónico, y detalles sobre sus mascotas. También podemos recopilar información sobre su uso de nuestros servicios.
          </p>

          <h2 className="text-2xl font-bold mb-4">2. Cómo Utilizamos su Información</h2>
          <p className="mb-6">
            Utilizamos su información para proporcionar y mejorar nuestros servicios, procesar pagos, enviar notificaciones importantes, y personalizar su experiencia con BienPet.
          </p>

          <h2 className="text-2xl font-bold mb-4">3. Compartir Información</h2>
          <p className="mb-6">
            No vendemos su información personal. Podemos compartir su información con proveedores de servicios que nos ayudan a operar nuestro negocio, o cuando sea requerido por la ley.
          </p>

          <h2 className="text-2xl font-bold mb-4">4. Seguridad de la Información</h2>
          <p className="mb-6">
            Implementamos medidas de seguridad diseñadas para proteger su información personal contra acceso no autorizado y uso indebido.
          </p>

          <h2 className="text-2xl font-bold mb-4">5. Sus Derechos</h2>
          <p className="mb-6">
            Usted tiene derecho a acceder, corregir o eliminar su información personal. También puede optar por no recibir comunicaciones de marketing en cualquier momento.
          </p>

          <h2 className="text-2xl font-bold mb-4">6. Cambios en esta Política</h2>
          <p className="mb-6">
            Podemos actualizar esta política de privacidad ocasionalmente. Le notificaremos sobre cambios significativos publicando un aviso prominente en nuestro sitio web.
          </p>

          <p className="mt-8 text-sm text-gray-600">
            Última actualización: 1 de Julio, 2023
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;