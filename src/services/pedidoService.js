import api from "./api";
import executarRequisicao from "./executarRequisicao";
import parametrosPagina from "./paginacao";

export function finalizarPedido(enderecoId) {
  return executarRequisicao(() => api.post("/ws/orders/checkout", { addressId: enderecoId }));
}

export function pagarPedido(id, metodo) {
  return executarRequisicao(() => api.post(`/ws/orders/${id}/pay`, { method: metodo }));
}

export function cancelarPedido(id) {
  return executarRequisicao(() => api.patch(`/ws/orders/${id}/cancel`));
}

export function listarMeusPedidos({ pagina = 0, moeda }) {
  return executarRequisicao(() =>
    api.get("/ws/orders", { params: { ...parametrosPagina(pagina), targetCurrency: moeda } })
  );
}

export function buscarPedido(id, moeda) {
  return executarRequisicao(() => api.get(`/ws/orders/${id}`, { params: { targetCurrency: moeda } }));
}
