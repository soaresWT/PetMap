"use client";
import { useState } from "react";
import { supabase } from "@/utils/supabase";

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
}

const ImageUpload = ({ onUploadSuccess }: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error } = await supabase.storage
        .from("images")
        .upload(fileName, file);

      if (error) throw error;

      const publicUrl = supabase.storage.from("images").getPublicUrl(fileName)
        .data.publicUrl;

      console.log(publicUrl);

      setImageUrl(publicUrl);
      onUploadSuccess(publicUrl);
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h1>Upload de Imagem</h1>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Enviando..." : "Enviar"}
      </button>

      {imageUrl && (
        <div>
          <h3>Imagem enviada com sucesso!</h3>
          <img src={imageUrl} alt="Imagem carregada" width={300} />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
