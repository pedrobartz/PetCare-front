import api from "./api";
import executarRequisicao from "./executarRequisicao";
import parametrosPagina from "./paginacao";

export function listarPetShops(pagina = 0) {
  return executarRequisicao(() => api.get("/agenda/establishments", { params: parametrosPagina(pagina) }));
}

export function buscarPetShop(id) {
  return executarRequisicao(() => api.get(`/agenda/establishments/${id}`));
}

export function listarServicosDoPetShop(id) {
  return executarRequisicao(() => api.get(`/agenda/establishments/${id}/services`));
}

export function listarHorariosLivres(petShopId, servicoId, data) {
  return executarRequisicao(() =>
    api.get(`/agenda/establishments/${petShopId}/slots`, { params: { serviceId: servicoId, date: data } })
  );
}
