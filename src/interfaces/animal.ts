export interface Animal {
  id: number;
  animal_type: string;
  photo_url: string;
  description: string;
  latitude: number;
  longitude: number;
  street?: string;
  updated_at: string;
  created_at: string;
}
