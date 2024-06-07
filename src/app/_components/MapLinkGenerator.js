import React from 'react';

const MapLinkGenerator = ({ startCoords, endCoords }) => {
  const generateMapLink = () => {
    const origin = `${startCoords.lat},${startCoords.lng}`;
    const destination = `${endCoords.lat},${endCoords.lng}`;
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
  };

  return (
    <div className='my-2'>
      <a href={generateMapLink()} target="_blank" rel="noopener noreferrer">
        <u>Otwórz szlak w Google Maps</u>        
      </a>
    </div>
  );
};

export default MapLinkGenerator;
