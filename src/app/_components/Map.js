"use client";

import React, { useEffect, useState, useRef } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

const MapComponent = ({ startCoords, endCoords }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);

  useEffect(() => {
    if (isLoaded && startCoords && endCoords) {
      calculateRoute();
    }
  }, [isLoaded, startCoords, endCoords]);

  const calculateRoute = async () => {
    if (!startCoords || !endCoords) {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: { lat: startCoords.lat, lng: startCoords.lng },
      destination: { lat: endCoords.lat, lng: endCoords.lng },
      travelMode: google.maps.TravelMode.WALKING,
    });
    setDirectionsResponse(results);
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <GoogleMap
      center={startCoords}
      zoom={15}
      mapContainerStyle={containerStyle}
      options={{
        zoomControl: true,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        
        
      }}
      onLoad={(map) => setMap(map)}
    >

      {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
    </GoogleMap>
  );
};

export default MapComponent;
