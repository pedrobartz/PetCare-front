import api from "./api";
import executarRequisicao from "./executarRequisicao";

export function buscarCotacao(origem, destino) {
  return executarRequisicao(() => api.get("/currencies", { params: { source: origem, target: destino } }));
}
