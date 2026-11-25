import api from "../api";
import executarRequisicao from "../executarRequisicao";
import parametrosPagina from "../paginacao";

export function listarPedidosRecebidos({ pagina = 0, status }) {
  const params = parametrosPagina(pagina);
  if (status) params.status = status;
  return executarRequisicao(() => api.get("/ws/orders/received", { params }));
}

export function buscarPedidoRecebido(id) {
  return executarRequisicao(() => api.get(`/ws/orders/received/${id}`));
}

export function atualizarStatusPedido(id, status) {
  return executarRequisicao(() => api.patch(`/ws/orders/${id}/status`, { status }));
}
