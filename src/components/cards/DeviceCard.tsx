// components/DeviceCard.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import mqtt from "mqtt";
import { Device } from '@/types/Device';

const DeviceCard = ({device} : {device: Device}) => {

    const [batteryVoltage, setBatteryVoltage] = useState(0);
    const [batteryPercentage, setBatteryPercentage] = useState(0);
    const [isOnline, setIsOnline] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const clientRef = useRef<mqtt.MqttClient | null>(null);
    
      useEffect(() => {
          const client = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_BROKER_URL || '', {
            username: process.env.NEXT_PUBLIC_MQTT_USER,
            password: process.env.NEXT_PUBLIC_MQTT_PASS,
            reconnectPeriod: 1000,
          });

          clientRef.current = client;
      
          client.on('connect', () => {
            client.subscribe(device.battLevelTopic, (err) => {
              if (!err) {
                console.log(`✅ Subscribed to ${device.battLevelTopic}`);
              }
            });
            client.subscribe(device.gpsTopic, (err) => {
              if (!err) {
                console.log(`✅ Subscribed to ${device.gpsTopic}`);
              }
            });
            startDataTimeout();
          });
      
          client.on("message", (topic, message) => {
            if (topic === device.battLevelTopic) {
              startDataTimeout();
              setIsOnline(true)
              const voltage = parseFloat(message.toString());
              // console.log("Received voltage:", voltage);
      
              // Clamp voltage within expected range
              const clampedVoltage = Math.min(Math.max(voltage, 9.0), 12.6);
              setBatteryVoltage(clampedVoltage);
      
              // Calculate percentage
              const percentage = ((clampedVoltage - 9.0) / (12.6 - 9.0)) * 100;
              setBatteryPercentage(Math.round(percentage));
            }
          });
      
          client.on('error', (err) => {
            console.error('MQTT error:', err);
            setIsOnline(false)
          });
      
          client.on('close', () => {
            console.log('MQTT connection closed');
            setIsOnline(false)
            clearTimeoutIfExists();
          });
      
          return () => {
            client.end();
            clearTimeoutIfExists();
          };
        }, []);

        const startDataTimeout = () => {
          clearTimeoutIfExists();
          timeoutRef.current = setTimeout(() => {
            setIsOnline(false);
          }, 10000); // 10 seconds
        };
      
        const clearTimeoutIfExists = () => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
        };
    

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{device.name}</h2>
        <div className="flex flex-col gap-2 mt-4">
          <div>
            <h1>Device Status: <span className={`px-2 py-2 rounded-full text-white text-xs ${
              isOnline ? 'bg-green-500' : 'bg-gray-500'
            }`}>{isOnline? "Online" : "Offline"}</span></h1>
          </div>
        </div>
        <div className="mt-4">
            <h1>Battery Status</h1>
            <div className={`w-full h-12 bg-gray-400 dark:bg-gray-600 rounded-lg overflow-hidden relative`}>
                <div
                className={`h-full ${!isOnline? "bg-gray-400" :
                    batteryPercentage > 50 ? "bg-green-500" : batteryPercentage > 20 ? "bg-yellow-400" : "bg-red-500"
                } transition-all duration-500`}
                style={{ width: `${batteryPercentage}%` }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center font-bold text-white">
                <div>{batteryPercentage}%</div>
                <div className="text-xs">{batteryVoltage.toFixed(2)}V</div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
