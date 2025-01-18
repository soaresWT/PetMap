"use client";
import { useState } from "react";

export default function GetLocation() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setError(null);
        },
        (err) => {
          setError(
            "Não foi possível acessar sua localização. Verifique as permissões."
          );
          console.error(err);
        },
        {
          enableHighAccuracy: true, // Usa GPS se disponível
          timeout: 10000, // Tempo limite
          maximumAge: 0, // Não usa dados de cache
        }
      );
    } else {
      setError("A API de Geolocalização não é suportada neste navegador.");
    }
  };

  return (
    <div>
      <button onClick={handleGetLocation}>Obter Localização</button>
      {location && (
        <p>
          Latitude: {location.lat}, Longitude: {location.lng}
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
