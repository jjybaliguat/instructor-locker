'use client';

import { useEffect, useRef, useState } from 'react';
import mqtt from 'mqtt';
import { cn } from '@/lib/utils'; // or your own utility

interface Props {
  topic: string;
}

export default function DeviceStatusCell({ topic }: Props) {
  const [status, setStatus] = useState('offline');
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
      client.subscribe(topic, (err) => {
        if (!err) {
          console.log(`✅ Subscribed to ${topic}`);
        }
      });
      startDataTimeout();
    });

    client.on('message', (receivedTopic, payload) => {
      if (receivedTopic === topic) {
        setStatus('online');
        startDataTimeout();
      }
    });

    client.on('error', (err) => {
      console.error('MQTT error:', err);
    });

    client.on('close', () => {
      console.log('MQTT connection closed');
      setStatus('offline');
      clearTimeoutIfExists();
    });

    return () => {
      client.end();
      clearTimeoutIfExists();
    };
  }, [topic]);

  const startDataTimeout = () => {
    clearTimeoutIfExists();
    timeoutRef.current = setTimeout(() => {
      setStatus('offline');
    }, 30000); // 30 seconds
  };

  const clearTimeoutIfExists = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  return (
    <div
      className={cn('capitalize', {
        'text-green-500': status === 'online',
        'text-gray-500': status === 'offline',
      })}
    >
      {status}
    </div>
  );
}
