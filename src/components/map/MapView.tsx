'use client';

import { useEffect, useState } from 'react';
import { Professional } from '@/types';

interface MapViewProps {
  professionals: Professional[];
  center?: [number, number];
  zoom?: number;
  onProfessionalClick?: (professional: Professional) => void;
  className?: string;
  showCoverage?: boolean;
  selectedProfessional?: Professional | null;
}

export default function MapView({
  professionals,
  center = [41.9028, 12.4964],
  zoom = 6,
  onProfessionalClick,
  className = 'h-[500px]',
  showCoverage = false,
  selectedProfessional = null,
}: MapViewProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={`${className} bg-zinc-100 flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-primary animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-text-secondary text-sm">Caricamento mappa...</p>
        </div>
      </div>
    );
  }

  return <MapInner
    professionals={professionals}
    center={center}
    zoom={zoom}
    onProfessionalClick={onProfessionalClick}
    className={className}
    showCoverage={showCoverage}
    selectedProfessional={selectedProfessional}
  />;
}

function MapInner({
  professionals,
  center,
  zoom,
  onProfessionalClick,
  className,
  showCoverage,
  selectedProfessional,
}: MapViewProps) {
  const [MapComponents, setMapComponents] = useState<{
    MapContainer: typeof import('react-leaflet').MapContainer;
    TileLayer: typeof import('react-leaflet').TileLayer;
    Marker: typeof import('react-leaflet').Marker;
    Popup: typeof import('react-leaflet').Popup;
    Circle: typeof import('react-leaflet').Circle;
  } | null>(null);
  const [L, setL] = useState<typeof import('leaflet') | null>(null);

  useEffect(() => {
    Promise.all([
      import('react-leaflet'),
      import('leaflet'),
      import('leaflet/dist/leaflet.css'),
    ]).then(([rl, leaflet]) => {
      setMapComponents({
        MapContainer: rl.MapContainer,
        TileLayer: rl.TileLayer,
        Marker: rl.Marker,
        Popup: rl.Popup,
        Circle: rl.Circle,
      });
      setL(leaflet);
    });
  }, []);

  if (!MapComponents || !L) {
    return (
      <div className={`${className} bg-zinc-100 flex items-center justify-center`}>
        <p className="text-text-secondary text-sm">Caricamento mappa...</p>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup, Circle } = MapComponents;

  const getCategoryIcon = (category: string, plan: string) => {
    const iconEmoji = category === 'elettricista' ? '⚡' : category === 'idraulico' ? '💧' : '🎨';
    const borderColor = plan === 'premium' ? '#F59E0B' : '#1A56DB';
    const bgColor = plan === 'premium' ? '#FEF3C7' : '#EFF6FF';

    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        width: 40px;
        height: 40px;
        border-radius: 0;
        background: ${bgColor};
        border: 3px solid ${borderColor};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        cursor: pointer;
        transition: transform 0.2s;
      ">${iconEmoji}</div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20],
      popupAnchor: [0, -24],
    });
  };

  return (
    <div className={`${className} overflow-hidden border border-zinc-200`}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {professionals.map((pro) => (
          <Marker
            key={pro.id}
            position={[pro.latitude, pro.longitude]}
            icon={getCategoryIcon(pro.category, pro.plan)}
            eventHandlers={{
              click: () => onProfessionalClick?.(pro),
            }}
          >
            <Popup>
              <div className="p-1 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">
                    {pro.category === 'elettricista' ? '⚡' : pro.category === 'idraulico' ? '💧' : '🎨'}
                  </span>
                  <div>
                    <h3 className="font-semibold text-sm">{pro.firstName} {pro.lastName}</h3>
                    <p className="text-xs text-gray-500 capitalize">{pro.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={`text-xs ${i < Math.round(pro.rating) ? 'text-amber-400' : 'text-gray-300'}`}>★</span>
                  ))}
                  <span className="text-xs text-gray-600 ml-1">{pro.rating}</span>
                </div>
                <a
                  href={`/professionista/${pro.slug}`}
                  className="block text-center text-xs bg-primary text-white py-1.5 hover:bg-primary-light transition-colors"
                >
                  Vedi profilo
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
        {showCoverage && selectedProfessional && (
          <Circle
            center={[selectedProfessional.latitude, selectedProfessional.longitude]}
            radius={selectedProfessional.coverageRadius * 1000}
            pathOptions={{
              color: selectedProfessional.plan === 'premium' ? '#F59E0B' : '#1A56DB',
              fillColor: selectedProfessional.plan === 'premium' ? '#FEF3C7' : '#EFF6FF',
              fillOpacity: 0.2,
              weight: 2,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
}
