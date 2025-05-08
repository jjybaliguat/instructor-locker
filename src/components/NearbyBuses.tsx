"use client"

import React, { useEffect, useState } from 'react'
import mqtt from "mqtt";
import useSWR from 'swr';
import { Device } from '@/types/Device';

interface nearbyBusesProps {

}

const NearbyBuses = () => {
    const {data: devices, isLoading} = useSWR('getDevices', GetDevices)
    const [nearbyBuses, setNearbyBuses] = useState(null)
    async function GetDevices(){
          try {
            const response = await fetch(`/api/device/get-all`)
            const data = await response.json()
            return data
          } catch (error) {
            console.log(error)
            return null
          }
        }
    
        useEffect(() => {
          const client = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_BROKER_URL || '', {
            username: process.env.NEXT_PUBLIC_MQTT_USER,
            password: process.env.NEXT_PUBLIC_MQTT_PASS,
            reconnectPeriod: 1000,
            clean: true
          });
        
            client.on("connect", () => {
              console.log("Connected to MQTT broker");
              devices?.map((device: Device)=>{
                client.subscribe(device.gpsTopic, (err) => {
                  if (!err) {
                    console.log(`Subscribed to ${device.gpsTopic}`);
                  } else {
                    console.error("Subscription error:", err);
                  }
                });
              })
            });
        
            client.on("message", (topic, payload) => {
              devices?.map((device: Device, index: number) => {
                if (topic === device.gpsTopic) {
                  const msg = payload?.toString();
                  try {
                    const data = JSON.parse(msg);
                    if (data.lat && data.lon) {
                    //   setGpsData((prev) => {
                    //     const newData = [...(prev ?? [])];
                    //     newData[index] = {
                    //       lat: data.lat,
                    //       lon: data.lon,
                    //       direction: data.direction,
                    //     };
                    //     return newData;
                    //   });
                    }
                  } catch (e) {
                    console.error("Invalid JSON received:", msg);
                  }
                }
              })
            });
        
            return () => {
              client.end();
            };
          }, [devices]);

  return (
    <>
        <div className='flex flex-col gap-2'>
            <h1 className='text-xl font-medium'>Nearby Mini-Buses</h1>
            {

            }
        </div>
    </>
  )
}

export default NearbyBuses