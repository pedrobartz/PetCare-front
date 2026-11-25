import api from "./api";
import executarRequisicao from "./executarRequisicao";

export function entrar(email, senha) {
  return executarRequisicao(() => api.post("/auth/signin", { email, password: senha }));
}

export function cadastrarCliente(dados) {
  return executarRequisicao(() => api.post("/auth/signup", dados));
}

export function cadastrarPrestador(dados) {
  return executarRequisicao(() => api.post("/auth/signup/provider", dados));
}
