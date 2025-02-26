import { useState } from "react";
import { supabase } from "@/utils/supabase";
import {
  Button,
  Select,
  Progress,
  Box,
  Flex,
  Text,
  Dialog,
} from "@radix-ui/themes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getStreetName } from "@/app/requests/getStreet";
type AnimalFormProps = {
  location: { lat: number; lng: number } | null;
};
const AnimalForm = ({ location }: AnimalFormProps) => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const [animalType, setAnimalType] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      handleUpload();
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { publicUrl } = supabase.storage
        .from("images")
        .getPublicUrl(fileName).data;

      setImageUrl(publicUrl);
      console.log("Image uploaded successfully:", publicUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file || !location || !animalType || !description) return;

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { publicUrl } = supabase.storage
        .from("images")
        .getPublicUrl(fileName).data;

      const { error: insertError } = await supabase.from("animals").insert([
        {
          animal_type: animalType,
          description,
          photo_url: publicUrl,
          latitude: location.lat,
          longitude: location.lng,
          street: await getStreetName(location.lat, location.lng),
        },
      ]);

      if (insertError) throw insertError;

      setImageUrl(publicUrl);

      console.log("Animal data saved successfully:", publicUrl);
    } catch (error) {
      console.error("Error uploading data:", error);
    } finally {
      setUploading(false);
      setOpen(true);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center" }}>Registrar Animal</h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <Flex direction="column" gap="2">
          <Text htmlFor="animalType" style={{ marginBottom: "0.5rem" }}>
            Tipo do Animal:
          </Text>
          <Select.Root onValueChange={setAnimalType}>
            <Select.Trigger className="select-trigger">
              <Text>{animalType || "Selecione o tipo de animal"}</Text>
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="gato">Gato</Select.Item>
              <Select.Item value="cachorro">Cachorro</Select.Item>
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex direction="column" gap="2">
          <Text htmlFor="description" style={{ marginBottom: "0.5rem" }}>
            Descrição:
          </Text>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </Flex>

        <Flex direction="column" gap="2">
          <Text htmlFor="fileInput" style={{ marginBottom: "0.5rem" }}>
            Upload de Imagem:
          </Text>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            required
            style={{
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </Flex>

        {uploading && (
          <Box maxWidth="300px" style={{ marginTop: "1rem" }}>
            <Progress />
          </Box>
        )}

        <Button
          type="submit"
          disabled={uploading}
          style={{ marginTop: "1rem" }}
        >
          {uploading ? "Enviando..." : "Enviar"}
        </Button>
      </form>

      {imageUrl && (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <h3>Imagem enviada com sucesso!</h3>
          <Image src={imageUrl} alt="Imagem carregada" width={50} height={50} />
        </div>
      )}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content>
          <Dialog.Title>Obrigado!</Dialog.Title>
          <Dialog.Description>
            Seus dados foram salvos com sucesso. Você será redirecionado em
            breve.
          </Dialog.Description>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};

export default AnimalForm;
