import axios from "axios";

import { API_URL } from "../config/api";

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

let tokenAtual = null;
let aoExpirarSessao = null;

export function definirToken(token) {
  tokenAtual = token;
}

export function definirAoExpirarSessao(callback) {
  aoExpirarSessao = callback;
}

api.interceptors.request.use((config) => {
  if (tokenAtual && config.url.startsWith("/ws/")) {
    config.headers.Authorization = `Bearer ${tokenAtual}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const rotaProtegida = error.config && error.config.url.startsWith("/ws/");
    if (error.response && error.response.status === 401 && rotaProtegida && aoExpirarSessao) {
      aoExpirarSessao();
    }
    return Promise.reject(error);
  }
);

export default api;
