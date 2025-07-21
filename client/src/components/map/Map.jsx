// MapComponent.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position = [33.6844, 73.0479]; // Example: Islamabad

export default function Map() {
  return (
    <div style={{ height: "600px", width: "500px" }}>
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        />
        <Marker position={position}>
          <Popup>Islamabad, Pakistan</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
