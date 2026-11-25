import { useEffect } from "react";

import Carregando from "./Carregando";
import MensagemErro from "./MensagemErro";
import avisar from "../../utils/avisar";

export default function ConteudoRequisicao({ requisicao, children }) {
  const { carregando, erro, dados, recarregar } = requisicao;
  const falhouAoRecarregar = Boolean(erro && dados);

  useEffect(() => {
    if (falhouAoRecarregar) avisar("Não foi possível atualizar", erro);
  }, [falhouAoRecarregar, erro]);

  if (carregando && !dados) return <Carregando />;
  if (erro && !dados) return <MensagemErro mensagem={erro} aoTentarNovamente={recarregar} />;
  if (!dados) return <Carregando />;

  return children(dados);
}
