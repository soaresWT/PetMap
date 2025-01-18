"use client";
import CommonWrapper from "@/components/CommonWrapper";
import { useState } from "react";

import dynamic from "next/dynamic";

const MapWithConfirmation = dynamic(() => import("@/components/GetLocation"), {
  ssr: false,
});

const AnimalForm = dynamic(() => import("@/components/AnimalForm"), {
  ssr: false,
});

export default function LocalPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const handleLocation = (lat: number, lng: number) => {
    setLocation({ lat, lng });
  };

  return (
    <CommonWrapper>
      {location ? (
        <AnimalForm location={location} />
      ) : (
        <MapWithConfirmation onConfirm={handleLocation} />
      )}
    </CommonWrapper>
  );
}
