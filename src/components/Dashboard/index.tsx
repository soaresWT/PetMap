import { supabase } from "@/utils/supabase";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Flex, Skeleton, Spinner, Table } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import "leaflet/dist/leaflet.css";
import { Animal } from "@/interfaces/animal";
import * as L from "leaflet";
import "leaflet.heat";
import Image from "next/image";
const iconDog = new L.Icon({
  iconUrl: "/cachorroIcon.png",
  iconSize: [25, 25],
  iconAnchor: [12, 41],
});

const iconCat = new L.Icon({
  iconUrl: "/gatoIcon.png",
  iconSize: [25, 25],
  iconAnchor: [12, 41],
});

export default function Dashboard() {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
        setAnimais(data as Animal[]);

        setLoading(false);
      }
    };

    fetchLocations();
  }, [isClient]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  return (
    <>
      {!position && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
            height: "50vh",
            width: "100%",
          }}
        >
          <Flex display={"flex"} direction={"column"} align={"center"}>
            <Spinner />
            <h1>Estamos buscando animais na sua região</h1>
          </Flex>
        </div>
      )}

      {position && (
        <MapContainer
          center={position}
          zoom={20}
          style={{ height: "50vh", width: "100%", marginTop: "20px" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {animais.map((animal) => (
            <Marker
              key={animal.id}
              position={[animal.latitude, animal.longitude]}
              icon={animal.animal_type === "cachorro" ? iconDog : iconCat}
            >
              <Popup>
                <div
                  style={{
                    textAlign: "center",
                    padding: "10px",
                    borderRadius: "8px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    height: "250px",
                    width: "450px",
                  }}
                >
                  <Image
                    src={animal.photo_url}
                    alt={animal.animal_type}
                    width={100}
                    height={100}
                    onClick={() => setSelectedImage(animal.photo_url)}
                    style={{ cursor: "pointer" }}
                  />
                  <div style={{ marginTop: "10px" }}>
                    <strong>{animal.animal_type}</strong> <br />{" "}
                    {animal.description}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
      {loading ? (
        <Flex width="100%" justify="center">
          <Table.Root
            variant="ghost"
            size="3"
            layout="auto"
            style={{ marginTop: "25px" }}
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>
                  <Skeleton width="100px" height="20px" />
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  <Skeleton width="100px" height="20px" />
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  <Skeleton width="100px" height="20px" />
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  <Skeleton width="100px" height="20px" />
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  <Skeleton width="100px" height="20px" />
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  <Skeleton width="100px" height="20px" />
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {Array.from({ length: 5 }).map((_, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Skeleton width="100px" height="20px" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton width="100px" height="20px" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton width="50px" height="50px" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton width="100px" height="20px" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton width="100px" height="20px" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton width="100px" height="20px" />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Flex>
      ) : (
        <Flex width="100%" justify="center">
          <Table.Root
            variant="ghost"
            size="3"
            layout="auto"
            style={{ marginTop: "25px" }}
          >
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Especie</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Descrição</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Foto</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Localização</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Atualizado em</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Criado em</Table.ColumnHeaderCell>
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
                      onClick={() => setSelectedImage(animal.photo_url)}
                      style={{ cursor: "pointer" }}
                    />
                  </Table.Cell>
                  <Table.Cell> {animal.street}</Table.Cell>
                  <Table.Cell>{formatDate(animal.updated_at)}</Table.Cell>
                  <Table.Cell>{formatDate(animal.created_at)}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Flex>
      )}

      <Dialog.Root
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <Dialog.Title>Imagem</Dialog.Title>
        <Dialog.Overlay
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            inset: 0,
          }}
        />
        <Dialog.Content
          style={{
            background: "white",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "90vw",
            maxHeight: "90vh",
            overflow: "auto",
            position: "fixed",
            top: "50%",
            left: "50%",
            zIndex: 1000,
            transform: "translate(-50%, -50%)",
          }}
        >
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Preview"
              width={1600}
              height={900}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                width: "auto",
                height: "auto",
              }}
            />
          )}
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
