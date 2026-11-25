import api from "../api";
import executarRequisicao from "../executarRequisicao";
import parametrosPagina from "../paginacao";

export function listarMeusProdutos({ pagina = 0 }) {
  return executarRequisicao(() => api.get("/ws/products/mine", { params: parametrosPagina(pagina) }));
}

export function criarProduto(produto) {
  return executarRequisicao(() => api.post("/ws/products", produto));
}

export function atualizarProduto(id, produto) {
  return executarRequisicao(() => api.put(`/ws/products/${id}`, produto));
}

export function desativarProduto(id) {
  return executarRequisicao(() => api.delete(`/ws/products/${id}`));
}
