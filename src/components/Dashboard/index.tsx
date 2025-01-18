"use client";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const icon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Dashboard() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [isClient, setIsClient] = useState(false);
  interface Animal {
    id: number;
    name: string;
    photo_url: string;
    description: string;
    latitude: number;
    longitude: number;
  }

  const [animais, setAnimais] = useState<Animal[]>([]);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error("Erro ao obter localização:", err);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }

    const fetchLocations = async () => {
      const { data, error } = await supabase.from("animals").select("*");
      if (error) {
        console.error("Erro ao buscar dados:", error);
      } else {
        setAnimais(data);
      }
    };

    fetchLocations();
  }, [isClient]);
  return (
    <>
      {position && (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {animais.map((animal) => (
            <Marker
              key={animal.id}
              position={[animal.latitude, animal.longitude]}
              icon={icon}
            >
              <Popup>
                {animal.name} <br /> {animal.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </>
  );
}
