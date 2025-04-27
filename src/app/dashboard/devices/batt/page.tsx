"use client";

import { useEffect, useState } from "react";
import mqtt from "mqtt";

export default function DevicePage() {
    const [batteryVoltage, setBatteryVoltage] = useState(0);
    const [batteryPercentage, setBatteryPercentage] = useState(0);

  useEffect(() => {
      const client = mqtt.connect(process.env.NEXT_PUBLIC_MQTT_BROKER_URL || '', {
        username: process.env.NEXT_PUBLIC_MQTT_USER,
        password: process.env.NEXT_PUBLIC_MQTT_PASS,
        reconnectPeriod: 1000,
      });
  
      client.on('connect', () => {
        client.subscribe("batt/mini-bus-1", (err) => {
          if (!err) {
            console.log(`✅ Subscribed to batt/mini-bus-1`);
          }
        });
      });
  
      client.on("message", (topic, message) => {
        if (topic === "batt/mini-bus-1") {
          const voltage = parseFloat(message.toString());
          console.log("Received voltage:", voltage);
  
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
      });
  
      client.on('close', () => {
        console.log('MQTT connection closed');
      });
  
      return () => {
        client.end();
      };
    }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Mini-Bus Battery Status</h1>

      <div className="w-64 h-12 bg-gray-300 rounded-lg overflow-hidden relative">
        <div
          className={`h-full ${
            batteryPercentage > 50 ? "bg-green-500" : batteryPercentage > 20 ? "bg-yellow-400" : "bg-red-500"
          } transition-all duration-500`}
          style={{ width: `${batteryPercentage}%` }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center font-bold text-white">
          <div>{batteryPercentage}%</div>
          <div className="text-xs">{batteryVoltage.toFixed(2)}V</div>
        </div>
      </div>

      <p className="mt-6 text-gray-600">Monitoring real-time battery voltage and level...</p>
    </div>
  );
}
