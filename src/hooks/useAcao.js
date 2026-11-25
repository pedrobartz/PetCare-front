import { useState } from "react";

import avisar from "../utils/avisar";

export default function useAcao() {
  const [executando, setExecutando] = useState(false);

  async function executar(acao, { tituloErro = "Não foi possível concluir", silencioso = false } = {}) {
    setExecutando(true);
    const response = await acao();
    setExecutando(false);

    if (!response.success && !silencioso) {
      avisar(tituloErro, response.message);
    }

    return response;
  }

  return { executando, executar };
}
