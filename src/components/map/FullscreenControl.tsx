'use client'

import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet.fullscreen'
import 'leaflet.fullscreen/Control.FullScreen.css'

export default function FullscreenControl() {
  const map = useMap()

  useEffect(() => {
    if (!map) return

    // @ts-ignore — plugin doesn't have official types
    const fullscreenControl = new L.Control.Fullscreen()
    map.addControl(fullscreenControl)

    return () => {
      map.removeControl(fullscreenControl)
    }
  }, [map])

  return null
}