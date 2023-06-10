'use client'

import { useState } from 'react'
import { GoogleMap, LoadScript, Circle, Marker } from '@react-google-maps/api'

type Position = {
  lat: number
  lng: number
}

const center: Position = {
  lat: 35.69575,
  lng: 139.77521,
}

const colors = [
  '#FF0000', // 赤色
  '#00FF00', // 緑色
  '#0000FF', // 青色
  '#FFFF00', // 黄色
  '#FFA500', // オレンジ色
  '#FFC0CB', // ピンク色
  '#800080', // 紫色
  '#00FFFF', // シアン色
  '#A52A2A', // ブラウン色
  '#000000', // ブラック色
]

const containerStyle = {
  height: '100vh',
  width: '100%',
}

export default function Home() {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY
  const [positions, setPositions] = useState<Position[]>([
    {
      lat: 35.69731,
      lng: 139.7747,
    },
    {
      lat: 35.69397,
      lng: 139.7762,
    },
  ])

  // マップを左クリックした位置に、MarkerとCircleが表示される
  return (
    <>
      {apiKey && (
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={17}
            onClick={e => {
              if (!e.latLng) return
              setPositions([
                ...positions,
                { lat: e.latLng?.lat(), lng: e.latLng?.lng() },
              ])
            }}
          >
            {positions.map((position, i) => (
              <div key={i}>
                <Circle
                  key={i}
                  center={position}
                  radius={50}
                  options={{
                    fillColor: colors[i % 10],
                    strokeColor: colors[i % 10],
                  }}
                />
                <Marker
                  position={position}
                  animation={(i % 2) + 1}
                  label={'hello'}
                />
              </div>
            ))}
          </GoogleMap>
        </LoadScript>
      )}
    </>
  )
}
