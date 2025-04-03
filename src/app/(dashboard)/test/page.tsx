"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L, { map } from "leaflet";
import "leaflet-rotatedmarker";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Define a bus icon
const busIcon = new L.Icon({
  iconUrl: "/bus-icon.png", // Replace with your bus image
  iconSize: [40, 40], // Adjust as needed
});

interface Coordinates {
  lat: number;
  lng: number;
}

export default function BusTracker() {
  const [busPosition, setBusPosition] = useState<Coordinates>({
    lat: 37.7749,
    lng: -122.4194,
  });

  const [rotation, setRotation] = useState<number>(0);

  // Function to calculate the rotation angle
  function getRotationAngle(prev: Coordinates, next: Coordinates): number {
    const angle = Math.atan2(next.lng - prev.lng, next.lat - prev.lat) * (180 / Math.PI);
    return angle;
  }

  // Simulate bus movement
  useEffect(() => {
    const route: Coordinates[] = [
      { lat: 37.775, lng: -122.42 },
      { lat: 37.776, lng: -122.421 },
      { lat: 37.777, lng: -122.423 },
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < route.length) {
        setRotation(getRotationAngle(busPosition, route[index]));
        setBusPosition(route[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [busPosition]);

  return (
    <MapContainer center={busPosition} zoom={15} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
}
