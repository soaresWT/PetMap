"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Flex, Spinner, Button, Text } from "@radix-ui/themes";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

type MapWithConfirmationProps = {
  onConfirm: (lat: number, lng: number) => void;
};
export default function MapWithConfirmation({
  onConfirm,
}: MapWithConfirmationProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
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
          timeout: 100000,
          maximumAge: 0,
        },
      );
    }
  }, [isClient]);

  const handleConfirm = () => {
    if (position) {
      const [latitude, longitude] = position;
      onConfirm(latitude, longitude);
      setIsConfirmed(true);
    }
  };

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      style={{
        width: "100%",
        height: "100vh",
        padding: "1.7rem",
        backgroundColor: "var(--primary-pink)",
      }}
    >
      {position ? (
        <>
          <Text size="6" weight="bold">
            Você esta aqui?
          </Text>
          <MapContainer
            center={position}
            zoom={13}
            style={{
              height: "400px",
              width: "100%",
              marginTop: "1.5rem",
              borderRadius: "1rem",
            }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} icon={icon}>
              <Popup>Você está aqui</Popup>
            </Marker>
          </MapContainer>
          {!isConfirmed && (
            <Button
              size="3"
              style={{ marginTop: "1em" }}
              onClick={handleConfirm}
            >
              Confirmar Localização
            </Button>
          )}
        </>
      ) : (
        <Spinner size="3" />
      )}
    </Flex>
  );
}
