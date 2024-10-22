import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface Clinic {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
}

interface ClinicMapProps {
  clinics: Clinic[];
  onSelectClinic: (clinic: Clinic) => void;
}

const ClinicMap: React.FC<ClinicMapProps> = ({ clinics, onSelectClinic }) => {
  const center = useMemo(() => {
    if (clinics.length === 0) return [19.4326, -99.1332];
    const lats = clinics.map(c => c.lat);
    const lngs = clinics.map(c => c.lng);
    return [(Math.min(...lats) + Math.max(...lats)) / 2, (Math.min(...lngs) + Math.max(...lngs)) / 2];
  }, [clinics]);

  return (
    <MapContainer center={center as [number, number]} zoom={11} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MarkerClusterGroup chunkedLoading>
        {clinics.map((clinic) => (
          <Marker
            key={clinic.id}
            position={[clinic.lat, clinic.lng]}
            eventHandlers={{
              click: () => onSelectClinic(clinic),
            }}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{clinic.name}</h3>
                <p>{clinic.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <MapBounds clinics={clinics} />
    </MapContainer>
  );
};

const MapBounds: React.FC<{ clinics: Clinic[] }> = ({ clinics }) => {
  const map = useMap();

  React.useEffect(() => {
    if (clinics.length > 0) {
      const bounds = L.latLngBounds(clinics.map(clinic => [clinic.lat, clinic.lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [clinics, map]);

  return null;
};

export default ClinicMap;