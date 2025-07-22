// MapComponent.jsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position = [33.6844, 73.0479]; // Example: Islamabad

export default function Map() {
  return (
    <div className="pt-28 flex justify-center items-center">
      <div
        style={{ height: "600px", width: "600px" }}
        className="border-2 border-black rounded-2xl"
      >
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%", borderRadius : "16px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          />
          <Marker position={position}>
            <Popup>Islamabad, Pakistan</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
