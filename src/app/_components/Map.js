"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { GoogleMap, Marker, Polyline, useJsApiLoader, InfoWindow } from '@react-google-maps/api';
import MapLinkGenerator from './MapLinkGenerator';

const containerStyle = {
  width: '100%',
  height: '500px',
};

const MapComponent = ({ startCoords, endCoords }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);
  const [routePath, setRoutePath] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null); 
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  useEffect(() => {
    if (isLoaded && startCoords && endCoords && map) {
      calculateRoute();
    }
  }, [isLoaded, startCoords, endCoords, map]);

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
    const route = results.routes[0];
    const path = route.overview_path.map(point => ({ lat: point.lat(), lng: point.lng() }));
    setRoutePath(path);

    const distance = route.legs[0].distance.text;
    const duration = route.legs[0].duration.text; 
    setDistance(distance);
    setDuration(formatDuration(duration)); 

    const bounds = new google.maps.LatLngBounds();
    path.forEach(point => bounds.extend(point));
    map.fitBounds(bounds);
  };

  const formatDuration = (duration) => {
    const regex = /(\d+)(?:\s*hour[s]?)?\s*(\d+)?(?:\s*minute[s]?)?/i;
    const matches = duration.match(regex);

    if (matches) {
      const hours = matches[1] ? `${matches[1]} godz.` : '';
      const minutes = matches[2] ? `${matches[2]} min.` : '';
      return `${hours} ${minutes}`.trim();
    }
    return duration;
  };

  const handlePolylineClick = (e) => {
    const clickedPosition = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    setSelectedPosition(clickedPosition);
    setInfoWindowOpen(false);
    setTimeout(() => {
      setInfoWindowOpen(true); 
    }, 0);
  };

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // Granice mapy 
  const bounds = {
    north: startCoords.lat + 0.4,
    south: startCoords.lat - 0.2,
    east: startCoords.lng + 0.4,
    west: startCoords.lng - 0.8,
  };

  return (
    <GoogleMap
      center={startCoords}
      zoom={15}
      mapContainerStyle={containerStyle}
      options={{
        zoomControl: true,
        streetViewControl: false,
        fullscreenControl: false,
        minZoom: 11,
        maxZoom: 20,
        mapTypeControl: true,
        mapTypeControlOptions: {      
          mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.HYBRID,
          ]
        },
        restriction: {
          latLngBounds: bounds,
          strictBounds: false,
        },
      }}
      onLoad={onLoad}
    >
      {routePath && (
        <Polyline
          path={routePath}
          options={{ strokeColor: '#FF0000', strokeOpacity: 0.4, strokeWeight: 5 }}
          onClick={handlePolylineClick}
        />
      )}
      {selectedPosition && infoWindowOpen && (
        <InfoWindow
          position={selectedPosition}
          onCloseClick={() => {
            setSelectedPosition(null);
            setInfoWindowOpen(false);
          }}
        >
          <div>
            <p>Dystans: {distance}</p>
            <p>{duration}</p> 
            <MapLinkGenerator startCoords={startCoords} endCoords={endCoords} />
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

export default MapComponent;
