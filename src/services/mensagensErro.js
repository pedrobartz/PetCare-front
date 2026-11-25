const MENSAGENS_POR_STATUS = {
  400: "Dados inválidos. Verifique as informações e tente novamente.",
  401: "Sua sessão expirou. Faça login novamente.",
  403: "Você não tem permissão para esta ação.",
  404: "Registro não encontrado.",
  409: "Não foi possível concluir por um conflito de regra.",
  503: "Serviço temporariamente indisponível. Tente novamente em instantes.",
};

export function extrairMensagemErro(error) {
  if (!error.response) {
    return "Não foi possível conectar ao servidor. Verifique sua conexão.";
  }

  const { status, data } = error.response;

  if (data && typeof data.message === "string" && data.message.trim()) {
    return data.message;
  }

  return MENSAGENS_POR_STATUS[status] || "Ocorreu um erro inesperado. Tente novamente.";
}
