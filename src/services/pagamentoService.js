import api from "./api";
import executarRequisicao from "./executarRequisicao";
import parametrosPagina from "./paginacao";

export function listarPagamentos({ pagina = 0 }) {
  return executarRequisicao(() => api.get("/ws/payments", { params: parametrosPagina(pagina) }));
}
