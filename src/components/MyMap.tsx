'use client'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useEffect, useState } from 'react'

const Map = () => {

    const [coord, setCoord] = useState<[number, number]>([14.6810331, 121.1123889])
    const [coord2, setCoord2] = useState<[number, number]>([14.7510342, 121.1423870])
    const [coord3, setCoord3] = useState<[number, number]>([14.7210350, 121.1323869])
    const [coord4, setCoord4] = useState<[number, number]>([14.7010336, 121.1023859])

    useEffect(() => {
        // Function to update coordinates
        const moveMarker = () => {
            console.log("moved")
            setCoord((prev) => [
            prev[0] + 0.00001, // Simulate latitude change
            prev[1] + 0.00001, // Simulate longitude change
          ]);
            setCoord2((prev) => [
            prev[0] + 0.00001, // Simulate latitude change
            prev[1] + 0.00001, // Simulate longitude change
          ]);
            setCoord3((prev) => [
            prev[0] + 0.00001, // Simulate latitude change
            prev[1] + 0.00001, // Simulate longitude change
          ]);
            setCoord4((prev) => [
            prev[0] + 0.00001, // Simulate latitude change
            prev[1] + 0.00001, // Simulate longitude change
          ]);
        };
    
        // Update coordinates every 1 second (1000ms)
        const intervalId = setInterval(moveMarker, 1000);
    
        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
      }, []);

    const SearchLocation = () => {
        return (
            <div className="search-location">
                <input type="text" placeholder="Search Location" />
            </div>
        )
    }

    const GetMyLocation = () => {
        const getMyLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    setCoord([position.coords.latitude, position.coords.longitude])
                })
            } else {
                console.log("Geolocation is not supported by this browser.")
            }
        }

        return (
            <div className="get-my-location">
                <button onClick={getMyLocation}>Get My Location</button>
            </div>
        )
    }

    if(window === undefined){
        return null
    }

    return (
        <div className='w-full h-[600px] z-40'>
            <MapContainer style={{
                height: '100%',
                width: '100%'
            }} center={coord} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker icon={
                    new L.Icon({
                        iconUrl: '/marker-icon.png',
                        iconRetinaUrl: '/marker-icon.png',
                        iconSize: [25, 41],
                        iconAnchor: [12.5, 41],
                        popupAnchor: [0, -41],
                        shadowUrl: '/marker-shadow.png',
                        shadowSize: [41, 41],
                    })
                } position={coord}>
                     <Popup>
                        Mini Bus 3. <br /> Driver: Unknown <br /> Plate Number: 00-000 <br /> Route: via San Isdro - Litex
                    </Popup>
                </Marker>
                <Marker icon={
                    new L.Icon({
                        iconUrl: '/marker-icon.png',
                        iconRetinaUrl: '/marker-icon.png',
                        iconSize: [25, 41],
                        iconAnchor: [12.5, 41],
                        popupAnchor: [0, -41],
                        shadowUrl: '/marker-shadow.png',
                        shadowSize: [41, 41],
                    })
                } position={coord2}>
                     <Popup>
                        Mini Bus 4. <br /> Driver: Unknown <br /> Plate Number: 00-000 <br /> Route: via San Isdro - Litex
                    </Popup>
                </Marker>
                <Marker icon={
                    new L.Icon({
                        iconUrl: '/marker-icon.png',
                        iconRetinaUrl: '/marker-icon.png',
                        iconSize: [25, 41],
                        iconAnchor: [12.5, 41],
                        popupAnchor: [0, -41],
                        shadowUrl: '/marker-shadow.png',
                        shadowSize: [41, 41],
                    })
                } position={coord3}>
                     <Popup>
                     Mini Bus 2. <br /> Driver: Unknown <br /> Plate Number: 00-000 <br /> Route: via San Isdro - Litex
                    </Popup>
                </Marker>
                <Marker icon={
                    new L.Icon({
                        iconUrl: '/marker-icon.png',
                        iconRetinaUrl: '/marker-icon.png',
                        iconSize: [25, 41],
                        iconAnchor: [12.5, 41],
                        popupAnchor: [0, -41],
                        shadowUrl: '/marker-shadow.png',
                        shadowSize: [41, 41],
                    })
                } position={coord4}>
                     <Popup>
                        Mini Bus 1. <br /> Driver: Unknown <br /> Plate Number: 00-000 <br /> Route: via San Isdro - Litex
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map