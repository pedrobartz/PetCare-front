import api from "./api";
import executarRequisicao from "./executarRequisicao";

export function buscarCarrinho(moeda) {
  return executarRequisicao(() => api.get("/ws/orders/cart", { params: { targetCurrency: moeda } }));
}

export function adicionarItem(produtoId, quantidade, substituirLoja = false) {
  const params = substituirLoja ? { replace: true } : {};
  return executarRequisicao(() =>
    api.post("/ws/orders/cart/items", { productId: produtoId, quantity: quantidade }, { params })
  );
}

export function alterarQuantidade(produtoId, quantidade, moeda) {
  return executarRequisicao(() =>
    api.patch(`/ws/orders/cart/items/${produtoId}`, { quantity: quantidade }, { params: { targetCurrency: moeda } })
  );
}

export function removerItem(produtoId, moeda) {
  return executarRequisicao(() =>
    api.delete(`/ws/orders/cart/items/${produtoId}`, { params: { targetCurrency: moeda } })
  );
}

export function esvaziarCarrinho() {
  return executarRequisicao(() => api.delete("/ws/orders/cart"));
}
