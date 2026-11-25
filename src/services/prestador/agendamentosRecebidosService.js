import api from "../api";
import executarRequisicao from "../executarRequisicao";
import parametrosPagina from "../paginacao";

export function listarAgendamentosRecebidos({ pagina = 0, tamanho }) {
  return executarRequisicao(() =>
    api.get("/ws/agenda/appointments/received", {
      params: { ...parametrosPagina(pagina, tamanho), sort: "startAt,desc" },
    })
  );
}

export function concluirAgendamento(id) {
  return executarRequisicao(() => api.patch(`/ws/agenda/appointments/${id}/complete`));
}
