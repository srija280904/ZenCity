import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const CityMap = () => {
  const position = [11.0168, 76.9558]; // Coimbatore Lat/Lng

  return (
    <div className="h-96">
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[11.0168, 76.9558]}>
            <Popup>
            City Center Traffic Sensor.
            </Popup>
        </Marker>
         <Marker position={[11.0250, 76.9650]}>
            <Popup>
            Gandhipuram Air Quality Sensor.
            </Popup>
        </Marker>
        </MapContainer>
    </div>
  );
};

export default CityMap;