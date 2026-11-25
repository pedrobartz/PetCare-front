import api from "./api";
import executarRequisicao from "./executarRequisicao";

export function listarEnderecos() {
  return executarRequisicao(() => api.get("/ws/auth/addresses"));
}

export function criarEndereco(endereco) {
  return executarRequisicao(() => api.post("/ws/auth/addresses", endereco));
}

export function atualizarEndereco(id, endereco) {
  return executarRequisicao(() => api.put(`/ws/auth/addresses/${id}`, endereco));
}

export function removerEndereco(id) {
  return executarRequisicao(() => api.delete(`/ws/auth/addresses/${id}`));
}
