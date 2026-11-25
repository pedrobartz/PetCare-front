import api from "./api";
import executarRequisicao from "./executarRequisicao";

export function listarPets() {
  return executarRequisicao(() => api.get("/ws/agenda/pets"));
}

export function buscarPet(id) {
  return executarRequisicao(() => api.get(`/ws/agenda/pets/${id}`));
}

export function criarPet(pet) {
  return executarRequisicao(() => api.post("/ws/agenda/pets", pet));
}

export function atualizarPet(id, pet) {
  return executarRequisicao(() => api.put(`/ws/agenda/pets/${id}`, pet));
}

export function removerPet(id) {
  return executarRequisicao(() => api.delete(`/ws/agenda/pets/${id}`));
}
