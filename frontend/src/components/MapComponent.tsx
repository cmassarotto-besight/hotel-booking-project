import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const containerStyle = {
    width: '90vw',
    height: '400px'
};

function MapComponent({ searchedLocation, markersData= [] }: { searchedLocation: any, markersData?: Array<any>}) {
    
  return (
      <LoadScript
          googleMapsApiKey={process.env.REACT_APP_MAP_API_KEY ?? ''}
      >
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={searchedLocation ?? { lat: 0, lng: 0 }}
              zoom={5}
              options={{ disableDefaultUI: true }}
            >
              {markersData.map((marker, index) => {
                return <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
              })}
              <></>
            </GoogleMap>
      </LoadScript>
  )
}

export default MapComponent;