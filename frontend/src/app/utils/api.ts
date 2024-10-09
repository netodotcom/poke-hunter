import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:3001";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: any) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error: any) => {
  return Promise.reject(error);
});

export const fetchRandomPokemon = async () => {
  const response = await api.get("/pokemon/random");
  return response.data;
};

export const capturePokemon = async (pokemonId: number) => {
  const response = await api.post(`/capture/${pokemonId}`);
  return response.data;
};

export const releasePokemon = async (pokemonId: number) => {
  const response = await api.delete(`/release/${pokemonId}`);
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export const getUserCapturedPokemons = async () => {
  const response = await api.get("/my-pokemons");
  return response.data;
};

export async function logout() {
  try {
    Cookies.set("accessToken", "")
    window.location.reload()
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
}