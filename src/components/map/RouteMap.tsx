'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { useRef } from 'react';
import L from 'leaflet';

// Fix default icon issue in Leaflet when using Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '',
  iconUrl: '',
  shadowUrl: '',
});


const RouteMap = ({
    routeLogs
}: {
    routeLogs: {
        lat: number,
        lon: number,
        direction: number
    }[]
}) => {
    const markerRef = useRef<L.Marker | null>(null);

    if (!routeLogs || routeLogs.length < 2) return <div className='h-screen flex justify-center items-center text-3xl font-bold'>Insufficient route data</div>

    const polylinePoints = routeLogs.map(log => [log.lat, log.lon] as [number, number])

    const center = polylinePoints[0]

    function createCustomArrowIcon(direction: number) {
          const iconHtml = `
            <div style="
              width: 16px;
              height: 16px;
              background-image: url('/arrow.png'); 
              background-size: contain;
              background-repeat: no-repeat;
              transform: rotate(${direction}deg);
              transform-origin: center;
              transition: transform 0.3s ease;
            "></div>`;
        
          return L.divIcon({
            className: '',
            html: iconHtml,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          });
        }

    return (
      <MapContainer center={[routeLogs[routeLogs.length-1].lat, routeLogs[routeLogs.length-1].lon]} zoom={16} style={{ height: '90vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
  
        {/* Only draw path from start to end, no closing */}
        {/* <Polyline positions={polylinePoints} color='blue' /> */}
  
        {/* Directional Arrows */}
        {routeLogs.map((log, index) => (
          <Marker
            key={index}
            position={[log.lat, log.lon]}
            icon={createCustomArrowIcon(log.direction)}
            ref={markerRef}
          />
        ))}
      </MapContainer>
    );
}

export default RouteMap