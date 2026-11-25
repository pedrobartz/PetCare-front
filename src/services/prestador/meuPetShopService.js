import api from "../api";
import executarRequisicao from "../executarRequisicao";

export const STATUS_SEM_PET_SHOP = 404;
const STATUS_REQUISICAO_INVALIDA = 400;

function semPetShopCadastrado(response) {
  return response.status === STATUS_REQUISICAO_INVALIDA || response.status === STATUS_SEM_PET_SHOP;
}

export async function buscarMeuPetShop() {
  const response = await executarRequisicao(() => api.get("/ws/agenda/establishment"));
  if (!response.success && semPetShopCadastrado(response)) {
    return { ...response, status: STATUS_SEM_PET_SHOP };
  }
  return response;
}

export function salvarMeuPetShop(dados) {
  return executarRequisicao(() => api.put("/ws/agenda/establishment", dados));
}

export function listarHorariosAtendimento() {
  return executarRequisicao(() => api.get("/ws/agenda/availability"));
}

export function salvarHorariosAtendimento(horarios) {
  return executarRequisicao(() => api.put("/ws/agenda/availability", horarios));
}
