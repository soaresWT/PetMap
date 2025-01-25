import axios from "axios";
export async function getStreetName(lat: number, lon: number) {
  const response = await axios.get(`/api/nominatim?lat=${lat}&lon=${lon}`);
  console.log(response.data.display_name);
  return response.data.display_name;
}
