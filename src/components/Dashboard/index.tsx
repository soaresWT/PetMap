"use client";
import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Table } from "@radix-ui/themes";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Image from "next/image";
const icon = new L.Icon({
  iconUrl: "/file.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Dashboard() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [isClient, setIsClient] = useState(false);
  interface Animal {
    id: number;
    animal_type: string;
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
        console.log(data);
      }
    };

    fetchLocations();
  }, [isClient]);
  return (
    <>
      {position && (
        <MapContainer
          center={position}
          zoom={20}
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
                {animal.animal_type} <br /> {animal.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
      {animais && (
        <>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Especie</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Descrição</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Foto</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {animais.map((animal) => (
                <Table.Row key={animal.id}>
                  <Table.Cell>{animal.animal_type}</Table.Cell>
                  <Table.Cell>{animal.description}</Table.Cell>
                  <Table.Cell>
                    <Image
                      src={animal.photo_url}
                      alt="animal"
                      width={50}
                      height={50}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </>
      )}
    </>
  );
}
