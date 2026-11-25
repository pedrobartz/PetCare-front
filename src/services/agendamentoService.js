import api from "./api";
import executarRequisicao from "./executarRequisicao";
import parametrosPagina from "./paginacao";

export function criarAgendamento({ petShopId, servicoId, inicio, petId }) {
  return executarRequisicao(() =>
    api.post("/ws/agenda/appointments", {
      establishmentId: petShopId,
      serviceId: servicoId,
      startAt: inicio,
      petId,
    })
  );
}

export function listarMeusAgendamentos({ pagina = 0, tamanho }) {
  return executarRequisicao(() =>
    api.get("/ws/agenda/appointments", { params: { ...parametrosPagina(pagina, tamanho), sort: "startAt,desc" } })
  );
}

export function buscarAgendamento(id) {
  return executarRequisicao(() => api.get(`/ws/agenda/appointments/${id}`));
}

export function pagarAgendamento(id, metodo) {
  return executarRequisicao(() => api.post(`/ws/agenda/appointments/${id}/pay`, { method: metodo }));
}

export function cancelarAgendamento(id) {
  return executarRequisicao(() => api.patch(`/ws/agenda/appointments/${id}/cancel`));
}
