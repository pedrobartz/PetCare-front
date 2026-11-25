import { extrairMensagemErro } from "./mensagensErro";

export default async function executarRequisicao(requisicao) {
  try {
    const response = await requisicao();
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return {
      success: false,
      status: error.response ? error.response.status : null,
      message: extrairMensagemErro(error),
    };
  }
}
