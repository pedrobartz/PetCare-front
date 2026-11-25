import api from "./api";
import executarRequisicao from "./executarRequisicao";
import parametrosPagina from "./paginacao";

export function listarProdutos({ pagina = 0, moeda, busca, categoria, petShopId }) {
  const params = { ...parametrosPagina(pagina), targetCurrency: moeda };
  if (busca) params.search = busca;
  if (categoria) params.category = categoria;
  if (petShopId) params.establishmentId = petShopId;
  return executarRequisicao(() => api.get("/products", { params }));
}

export function buscarProduto(id, moeda) {
  return executarRequisicao(() => api.get(`/products/${id}`, { params: { targetCurrency: moeda } }));
}

export function listarCategorias() {
  return executarRequisicao(() => api.get("/products/categories"));
}
