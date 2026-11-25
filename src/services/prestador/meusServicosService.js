import api from "../api";
import executarRequisicao from "../executarRequisicao";

export function criarServico(servico) {
  return executarRequisicao(() => api.post("/ws/agenda/services", servico));
}

export function atualizarServico(id, servico) {
  return executarRequisicao(() => api.put(`/ws/agenda/services/${id}`, servico));
}

export function desativarServico(id) {
  return executarRequisicao(() => api.delete(`/ws/agenda/services/${id}`));
}
